import {
	Injectable,
	TransferState,
	inject,
	makeStateKey,
	signal,
} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {catchError, finalize, of, tap} from 'rxjs';
import {PiecesApi} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceStatusesService {
	private readonly api = inject(PiecesApi);
	private readonly state = inject(TransferState);
	private readonly key = makeStateKey<PieceStatusType[]>('statuses');

	private readonly _data = signal<PieceStatusType[]>([]);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetch() {
		const stored = this.state.get(this.key, null);
		if (stored) {
			this._data.set(stored);
			return of(stored);
		}

		this._isLoading.set(true);
		this._hasError.set(false);
		return this.api.fetchStatuses().pipe(
			tap(res => {
				this.setData(res);
			}),
			catchError(() => {
				this._hasError.set(true);
				this.resetData();
				return of(null);
			}),
			finalize(() => {
				this._isLoading.set(false);
			}),
		);
	}

	private setData(data: PieceStatusType[]) {
		this._data.set(data);
		this.state.set(this.key, data);
	}

	private resetData() {
		this._data.set([]);
		this.state.remove(this.key);
	}
}
