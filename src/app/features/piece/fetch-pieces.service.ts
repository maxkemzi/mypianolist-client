import {Injectable, signal} from '@angular/core';
import {Piece} from '@entities/piece';
import {PaginationResponse} from '@shared/lib';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export abstract class FetchPiecesService<
	Response extends PaginationResponse<Piece>,
	Params extends object,
> {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 1,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};

	readonly data = signal<Response['content']>(this.InitialValue.DATA);
	readonly page = signal<number>(this.InitialValue.PAGE);
	readonly limit = signal<number>(this.InitialValue.LIMIT);
	readonly totalCount = signal<number>(this.InitialValue.TOTAL_COUNT);
	readonly totalPages = signal<number>(this.InitialValue.TOTAL_PAGES);
	readonly hasMore = signal<boolean>(this.InitialValue.HAS_MORE);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	abstract fetch(params: Params): Observable<Response | null>;

	protected setValues(res: Response) {
		this.data.set(res.content);
		this.page.set(res.page);
		this.limit.set(res.limit);
		this.totalCount.set(res.totalCount);
		this.totalPages.set(res.totalPages);
		this.hasMore.set(res.hasMore);
	}

	protected resetValues() {
		this.data.set(this.InitialValue.DATA);
		this.page.set(this.InitialValue.PAGE);
		this.limit.set(this.InitialValue.LIMIT);
		this.totalCount.set(this.InitialValue.TOTAL_COUNT);
		this.totalPages.set(this.InitialValue.TOTAL_PAGES);
		this.hasMore.set(this.InitialValue.HAS_MORE);
	}
}
