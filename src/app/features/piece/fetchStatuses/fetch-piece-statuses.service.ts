import {
	Injectable,
	TransferState,
	inject,
	makeStateKey,
	signal,
} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {catchError, finalize, of, tap} from 'rxjs';
import {FetchPieceStatusesApi} from './fetch-piece-statuses.api';

@Injectable({providedIn: 'root'})
export class FetchPieceStatusesService {
	private readonly api = inject(FetchPieceStatusesApi);
	private readonly state = inject(TransferState);
	private readonly key = makeStateKey<PieceStatusType[]>('statuses');

	readonly data = signal<PieceStatusType[]>([]);
	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetch() {
		const stored = this.state.get(this.key, undefined);
		if (stored) {
			this.data.set(stored);
			return of(stored);
		}

		this.isLoading.set(true);
		this.hasError.set(false);
		return this.api.fetch().pipe(
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

	private setData(data: PieceStatusType[]) {
		this.data.set(data);
		this.state.set(this.key, data);
	}

	private resetData() {
		this.data.set([]);
		this.state.remove(this.key);
	}
}
