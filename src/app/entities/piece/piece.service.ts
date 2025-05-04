import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {catchError, of, tap} from 'rxjs';
import {PieceApi} from './piece.api';
import {Piece} from './piece.model';

@Injectable({providedIn: 'root'})
export class PieceService {
	private readonly api = inject(PieceApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Piece | null | undefined>(undefined);

	fetchById(id: string) {
		const key = this.getDataKey(id);

		if (this.state.hasKey(key)) {
			const stored = this.state.get(key, null);
			this.data.set(stored);
			return of(stored);
		}

		return this.api.fetchById(id).pipe(
			tap(data => {
				this.data.set(data);
				this.state.set(key, data);
			}),
			catchError(e => {
				this.data.set(null);
				this.state.set(key, null);

				return of(null);
			}),
		);
	}

	private getDataKey(id: string) {
		return makeStateKey<Piece>('piece_' + id);
	}
}
