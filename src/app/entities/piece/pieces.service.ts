import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {FetchAllPiecesResponse, PieceApi} from './piece.api';
import {Piece} from './piece.model';

@Injectable({providedIn: 'root'})
export class PiecesService {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 0,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};
	private readonly api = inject(PieceApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Piece[]>(this.InitialValue.DATA);
	readonly page = signal<number>(this.InitialValue.PAGE);
	readonly limit = signal<number>(this.InitialValue.LIMIT);
	readonly totalCount = signal<number>(this.InitialValue.TOTAL_COUNT);
	readonly totalPages = signal<number>(this.InitialValue.TOTAL_PAGES);
	readonly hasMore = signal<boolean>(this.InitialValue.HAS_MORE);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetchAll({
		search,
		genre,
	}: {
		search?: string;
		genre?: string;
	} = {}): Observable<FetchAllPiecesResponse | null> {
		const key = this.getDataKey(genre);

		if (search === undefined) {
			const stored = this.state.get(key, undefined);
			if (stored) {
				this.setValues(stored);
				return of(stored);
			}
		}

		this.hasError.set(false);
		this.isLoading.set(true);
		return this.api.fetchAll({search, genre}).pipe(
			tap(res => {
				this.setValues(res);
				this.state.set(key, res);
			}),
			catchError(() => {
				this.hasError.set(true);
				this.resetValues();
				this.state.remove(key);
				return of(null);
			}),
			finalize(() => {
				this.isLoading.set(false);
			}),
		);
	}

	private getDataKey(genre?: string) {
		return makeStateKey<FetchAllPiecesResponse>('pieces_' + (genre ?? 'all'));
	}

	private setValues(res: FetchAllPiecesResponse) {
		this.data.set(res.content);
		this.page.set(res.page);
		this.limit.set(res.limit);
		this.totalCount.set(res.totalCount);
		this.totalPages.set(res.totalPages);
		this.hasMore.set(res.hasMore);
	}

	private resetValues() {
		this.data.set(this.InitialValue.DATA);
		this.page.set(this.InitialValue.PAGE);
		this.limit.set(this.InitialValue.LIMIT);
		this.totalCount.set(this.InitialValue.TOTAL_COUNT);
		this.totalPages.set(this.InitialValue.TOTAL_PAGES);
		this.hasMore.set(this.InitialValue.HAS_MORE);
	}
}
