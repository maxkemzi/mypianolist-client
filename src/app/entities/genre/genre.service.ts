import {inject, Injectable, makeStateKey, TransferState} from '@angular/core';
import {GenreApi} from './genre.api';
import {map, Observable, of, tap} from 'rxjs';
import {Genre} from './genre.model';

@Injectable({providedIn: 'root'})
export class GenreService {
	private readonly DATA_KEY = makeStateKey<Genre[]>('genres');
	private readonly api = inject(GenreApi);
	private readonly state = inject(TransferState);

	fetchAll(): Observable<Genre[]> {
		if (this.state.hasKey(this.DATA_KEY)) {
			const stored = this.state.get(this.DATA_KEY, []);
			return of(stored);
		}

		return this.api.fetchAll().pipe(
			map(res => res.content),
			tap(data => {
				this.state.set<Genre[]>(this.DATA_KEY, data);
			}),
		);
	}
}
