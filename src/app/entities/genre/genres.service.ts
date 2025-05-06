import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {GenreApi} from './genre.api';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {Genre} from './genre.model';

@Injectable({providedIn: 'root'})
export class GenresService {
	private readonly key = makeStateKey<Genre[]>('genres');
	private readonly api = inject(GenreApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Genre[]>([]);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetchAll(): Observable<Genre[] | null> {
		const stored = this.state.get(this.key, undefined);
		if (stored) {
			this.data.set(stored);
			return of(stored);
		}

		this.hasError.set(false);
		this.isLoading.set(true);
		return this.api.fetchAll().pipe(
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
