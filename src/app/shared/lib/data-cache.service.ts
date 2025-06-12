import {
	inject,
	Injectable,
	makeStateKey,
	StateKey,
	TransferState,
} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataCacheService {
	private readonly state = inject(TransferState);
	private readonly keysByPrefix: Record<string, StateKey<any>[]> = {};

	get<T>(prefix: string, params: object): T | undefined {
		const key = makeStateKey<T>(this.serializeKey(prefix, params));
		return this.state.get(key, undefined);
	}

	set<T>(prefix: string, params: object, value: T): void {
		const key = makeStateKey<T>(this.serializeKey(prefix, params));
		this.state.set(key, value);

		if (prefix in this.keysByPrefix) {
			this.keysByPrefix[prefix].push(key);
		} else {
			this.keysByPrefix[prefix] = [key];
		}
	}

	remove(prefix: string, params: object): void {
		const key = makeStateKey(this.serializeKey(prefix, params));
		this.state.remove(key);

		if (prefix in this.keysByPrefix) {
			const keys = this.keysByPrefix[prefix];

			if (keys.length !== 0) {
				this.keysByPrefix[prefix] = keys.filter(k => k !== key);
			} else {
				delete this.keysByPrefix[prefix];
			}
		}
	}

	removeByPrefix(prefix: string) {
		const keys = this.keysByPrefix[prefix];
		if (keys) {
			for (const key of keys) {
				this.state.remove(key);
			}
		}
	}

	private serializeKey(prefix: string, params: object): string {
		return `${prefix}_` + btoa(JSON.stringify(params));
	}
}
