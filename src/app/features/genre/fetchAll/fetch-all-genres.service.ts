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

	readonly data = signal<Genre[]>([]);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetch(): Observable<Genre[] | null> {
		const stored = this.state.get(this.key, undefined);
		if (stored) {
			this.data.set(stored);
			return of(stored);
		}

		this.hasError.set(false);
		this.isLoading.set(true);
		return this.api.fetch().pipe(
			map(res => res.content),
			tap(data => {
				this.data.set(data);
				this.state.set<Genre[]>(this.key, data);
			}),
			catchError(() => {
				this.hasError.set(true);
				this.data.set([]);
				this.state.remove(this.key);
				return of(null);
			}),
			finalize(() => {
				this.isLoading.set(false);
			}),
		);
	}
}
