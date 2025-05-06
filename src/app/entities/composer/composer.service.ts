import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {Composer} from './composer.model';
import {ComposersApi} from './composers.api';

@Injectable({providedIn: 'root'})
export class ComposerService {
	private readonly api = inject(ComposersApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Composer | null | undefined>(undefined);

	fetchById(id: string): Observable<Composer | null> {
		const key = this.getDataKey(id);

		const stored = this.state.get(key, undefined);
		if (stored) {
			this.data.set(stored);
			return of(stored);
		}

		return this.api.fetchById(id).pipe(
			tap(res => {
				this.data.set(res);
				this.state.set(key, res);
			}),
			catchError(() => {
				this.data.set(null);
				this.state.remove(key);
				return of(null);
			}),
		);
	}

	private getDataKey(id: string) {
		return makeStateKey<Composer>('composer_' + id);
	}
}
