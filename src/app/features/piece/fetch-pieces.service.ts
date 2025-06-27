import {Injectable, signal} from '@angular/core';
import {Piece} from '@entities/piece';
import {PaginationResponse} from '@shared/lib';

@Injectable({providedIn: 'root'})
export abstract class FetchPiecesService<
	Response extends PaginationResponse<Piece>,
> {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 1,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};

	protected readonly _data = signal<Response['content']>(
		this.InitialValue.DATA,
	);
	protected readonly _page = signal<number>(this.InitialValue.PAGE);
	protected readonly _limit = signal<number>(this.InitialValue.LIMIT);
	protected readonly _totalCount = signal<number>(
		this.InitialValue.TOTAL_COUNT,
	);
	protected readonly _totalPages = signal<number>(
		this.InitialValue.TOTAL_PAGES,
	);
	protected readonly _hasMore = signal<boolean>(this.InitialValue.HAS_MORE);
	protected readonly _isLoading = signal<boolean>(false);
	protected readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly page = this._page.asReadonly();
	readonly limit = this._limit.asReadonly();
	readonly totalCount = this._totalCount.asReadonly();
	readonly totalPages = this._totalPages.asReadonly();
	readonly hasMore = this._hasMore.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	protected setValues(res: Response) {
		this._data.set(res.content);
		this._page.set(res.page);
		this._limit.set(res.limit);
		this._totalCount.set(res.totalCount);
		this._totalPages.set(res.totalPages);
		this._hasMore.set(res.hasMore);
	}

	protected resetValues() {
		this._data.set(this.InitialValue.DATA);
		this._page.set(this.InitialValue.PAGE);
		this._limit.set(this.InitialValue.LIMIT);
		this._totalCount.set(this.InitialValue.TOTAL_COUNT);
		this._totalPages.set(this.InitialValue.TOTAL_PAGES);
		this._hasMore.set(this.InitialValue.HAS_MORE);
	}
}
