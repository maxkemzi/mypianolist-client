import {
	Injectable,
	TransferState,
	inject,
	makeStateKey,
	signal,
} from '@angular/core';
import {CompleteComposer} from '@entities/composer';
import {Observable, catchError, of, tap} from 'rxjs';
import {FetchComposerByIdApi} from './fetch-composer-by-id.api';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdService {
	private readonly api = inject(FetchComposerByIdApi);
	private readonly state = inject(TransferState);

	private readonly _data = signal<CompleteComposer | null | undefined>(
		undefined,
	);

	readonly data = this._data.asReadonly();

	fetch(id: string): Observable<CompleteComposer | null> {
		const key = this.getDataKey(id);

		const stored = this.state.get(key, undefined);
		if (stored) {
			this._data.set(stored);
			return of(stored);
		}

		return this.api.fetchById(id).pipe(
			tap(res => {
				this._data.set(res);
				this.state.set(key, res);
			}),
			catchError(() => {
				this._data.set(null);
				this.state.remove(key);
				return of(null);
			}),
		);
	}

	private getDataKey(id: string) {
		return makeStateKey<CompleteComposer>('composer_' + id);
	}
}
