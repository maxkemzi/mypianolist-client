import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {Genre} from '@entities/genre';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {FetchAllGenresApi} from './fetch-all-genres.api';

@Injectable({providedIn: 'root'})
export class FetchAllGenresService {
	private readonly key = makeStateKey<Genre[]>('genres');
	private readonly api = inject(FetchAllGenresApi);
	private readonly state = inject(TransferState);

	private readonly _data = signal<Genre[]>([]);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetch(): Observable<Genre[] | null> {
		const stored = this.state.get(this.key, null);
		if (stored) {
			this._data.set(stored);
			return of(stored);
		}

		this._hasError.set(false);
		this._isLoading.set(true);
		return this.api.fetch().pipe(
			map(res => res.content),
			tap(data => {
				this._data.set(data);
				this.state.set<Genre[]>(this.key, data);
			}),
			catchError(() => {
				this._hasError.set(true);
				this._data.set([]);
				this.state.remove(this.key);
				return of(null);
			}),
			finalize(() => {
				this._isLoading.set(false);
			}),
		);
	}
}
