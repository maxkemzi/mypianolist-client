import {
	Injectable,
	TransferState,
	inject,
	makeStateKey,
	signal,
} from '@angular/core';
import {Composer} from '@entities/composer';
import {Observable, catchError, of, tap} from 'rxjs';
import {FetchComposerByIdApi} from './fetch-composer-by-id.api';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdService {
	private readonly api = inject(FetchComposerByIdApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Composer | null | undefined>(undefined);

	fetch(id: string): Observable<Composer | null> {
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
