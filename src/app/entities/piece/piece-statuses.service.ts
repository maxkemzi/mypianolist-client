import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {PiecesApi} from './pieces.api';
import {PieceStatus} from './piece.model';
import {catchError, finalize, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PieceStatusesService {
	private readonly api = inject(PiecesApi);
	private readonly state = inject(TransferState);
	private readonly key = makeStateKey<PieceStatus[]>('statuses');

	readonly data = signal<PieceStatus[]>([]);
	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetchStatuses() {
		const stored = this.state.get(this.key, undefined);
		if (stored) {
			this.data.set(stored);
			return of(stored);
		}

		this.isLoading.set(true);
		this.hasError.set(false);
		return this.api.fetchStatuses().pipe(
			tap(res => {
				this.setData(res);
			}),
			catchError(() => {
				this.hasError.set(true);
				this.resetData();
				return of(null);
			}),
			finalize(() => {
				this.isLoading.set(false);
			}),
		);
	}

	private setData(data: PieceStatus[]) {
		this.data.set(data);
		this.state.set(this.key, data);
	}

	private resetData() {
		this.data.set([]);
		this.state.remove(this.key);
	}
}
