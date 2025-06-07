import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {FetchAllPiecesApi, FetchResponse} from './fetch-all-pieces.api';
import {CompletePiece, PieceSort} from '@entities/piece';

@Injectable({providedIn: 'root'})
export class FetchAllPiecesService {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 1,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};
	private readonly api = inject(FetchAllPiecesApi);
	private readonly state = inject(TransferState);

	readonly data = signal<CompletePiece[]>(this.InitialValue.DATA);
	readonly page = signal<number>(this.InitialValue.PAGE);
	readonly limit = signal<number>(this.InitialValue.LIMIT);
	readonly totalCount = signal<number>(this.InitialValue.TOTAL_COUNT);
	readonly totalPages = signal<number>(this.InitialValue.TOTAL_PAGES);
	readonly hasMore = signal<boolean>(this.InitialValue.HAS_MORE);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetch({
		search,
		genre,
		sort,
	}: {
		search?: string;
		genre?: string;
		page?: number;
		sort?: PieceSort;
	} = {}): Observable<FetchResponse | null> {
		const key = this.getDataKey(genre, sort);

		if (search === undefined) {
			const stored = this.state.get(key, undefined);
			if (stored) {
				this.setValues(stored);
				return of(stored);
			}
		}

		this.isLoading.set(true);
		this.hasError.set(false);
		return this.api
			.fetch({
				search,
				genre,
				page: this.toApiPage(this.page()),
				limit: this.limit(),
				sort,
			})
			.pipe(
				map(res => ({...res, page: this.toUiPage(res.page)})),
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

	private getDataKey(genre?: string, sort?: string) {
		return makeStateKey<FetchResponse>(
			'pieces_' + (genre ?? 'all') + '_' + this.page() + '_' + sort,
		);
	}

	private toApiPage(page: number) {
		return page - 1;
	}

	private toUiPage(page: number) {
		return page + 1;
	}

	private setValues(res: FetchResponse) {
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
