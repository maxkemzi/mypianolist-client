import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {CompletePiece} from '@entities/piece';
import {of, tap, catchError} from 'rxjs';
import {FetchPieceByIdApi} from './fetch-piece-by-id.api';

@Injectable({providedIn: 'root'})
export class FetchPieceByIdService {
	private readonly api = inject(FetchPieceByIdApi);
	private readonly state = inject(TransferState);

	private readonly _data = signal<CompletePiece | null | undefined>(undefined);

	readonly data = this._data.asReadonly();

	fetch(id: string) {
		const key = this.getDataKey(id);

		if (this.state.hasKey(key)) {
			const stored = this.state.get(key, null);
			this._data.set(stored);
			return of(stored);
		}

		return this.api.fetchById(id).pipe(
			tap(data => {
				this._data.set(data);
				this.state.set(key, data);
			}),
			catchError(() => {
				this._data.set(null);
				this.state.set(key, null);

				return of(null);
			}),
		);
	}

	private getDataKey(id: string) {
		return makeStateKey<CompletePiece>('piece_' + id);
	}
}
