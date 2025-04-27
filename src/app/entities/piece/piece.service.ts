import {inject, Injectable, makeStateKey, TransferState} from '@angular/core';
import {map, Observable, of, tap} from 'rxjs';
import {PieceApi} from './piece.api';
import {Piece} from './piece.model';

@Injectable({providedIn: 'root'})
export class PieceService {
	private readonly DATA_KEY = makeStateKey<Piece[]>('pieces');
	private readonly api = inject(PieceApi);
	private readonly state = inject(TransferState);

	fetchAll(): Observable<Piece[]> {
		if (this.state.hasKey(this.DATA_KEY)) {
			const stored = this.state.get(this.DATA_KEY, []);
			return of(stored);
		}

		return this.api.fetchAll().pipe(
			map(res => res.content),
			tap(data => {
				this.state.set<Piece[]>(this.DATA_KEY, data);
			}),
		);
	}
}
