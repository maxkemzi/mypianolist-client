import {Injectable, signal} from '@angular/core';
import {PaginationResponse} from '@shared/lib';

@Injectable({providedIn: 'root'})
export abstract class PaginatedFetchService<
	Response extends PaginationResponse<any>,
> {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 1,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};
	private readonly _data = signal<Response['content']>(this.InitialValue.DATA);
	private readonly _page = signal<number>(this.InitialValue.PAGE);
	private readonly _limit = signal<number>(this.InitialValue.LIMIT);
	private readonly _totalCount = signal<number>(this.InitialValue.TOTAL_COUNT);
	private readonly _totalPages = signal<number>(this.InitialValue.TOTAL_PAGES);
	private readonly _hasMore = signal<boolean>(this.InitialValue.HAS_MORE);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly page = this._page.asReadonly();
	readonly limit = this._limit.asReadonly();
	readonly totalCount = this._totalCount.asReadonly();
	readonly totalPages = this._totalPages.asReadonly();
	readonly hasMore = this._hasMore.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	protected setData(value: Response['content']) {
		this._data.set(value);
	}

	protected setPage(value: number) {
		this._page.set(value);
	}

	protected setLimit(value: number) {
		this._limit.set(value);
	}

	protected setTotalCount(value: number) {
		this._totalCount.set(value);
	}

	protected setTotalPages(value: number) {
		this._totalPages.set(value);
	}

	protected setHasMore(value: boolean) {
		this._hasMore.set(value);
	}

	protected setIsLoading(value: boolean) {
		this._isLoading.set(value);
	}

	protected setHasError(value: boolean) {
		this._hasError.set(value);
	}

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
