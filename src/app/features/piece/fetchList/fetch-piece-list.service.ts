import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	StateKey,
	TransferState,
} from '@angular/core';
import {PieceStatusType, UserPiece} from '@entities/piece';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {FetchAllResponse, FetchPieceListApi} from './fetch-piece-list.api';

@Injectable({providedIn: 'root'})
export class FetchPieceListService {
	private readonly InitialValue = {
		DATA: [],
		PAGE: 1,
		LIMIT: 10,
		TOTAL_COUNT: 0,
		TOTAL_PAGES: 1,
		HAS_MORE: false,
	};
	private readonly api = inject(FetchPieceListApi);
	private readonly state = inject(TransferState);

	private readonly keys = signal<StateKey<FetchAllResponse>[]>([]);

	readonly data = signal<UserPiece[]>(this.InitialValue.DATA);
	readonly page = signal<number>(this.InitialValue.PAGE);
	readonly limit = signal<number>(this.InitialValue.LIMIT);
	readonly totalCount = signal<number>(this.InitialValue.TOTAL_COUNT);
	readonly totalPages = signal<number>(this.InitialValue.TOTAL_PAGES);
	readonly hasMore = signal<boolean>(this.InitialValue.HAS_MORE);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	fetch({
		genre,
		search,
		status,
		page,
	}: {
		search?: string;
		genre?: string;
		status?: PieceStatusType;
		page?: number;
	} = {}): Observable<FetchAllResponse | null> {
		const key = this.getDataKey({genre, search, status, page});

		const stored = this.state.get(key, undefined);
		if (stored) {
			this.setValues(stored);
			return of(stored);
		}

		this.isLoading.set(true);
		this.hasError.set(false);
		return this.api
			.fetchAll({
				genre,
				search,
				status,
				page,
				limit: this.limit(),
			})
			.pipe(
				tap(res => {
					this.setValues(res);
					this.state.set(key, res);
					this.keys.update(prev => [...prev, key]);
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

	clearCache() {
		for (const key of this.keys()) {
			this.state.remove(key);
		}
	}

	private getDataKey({
		genre,
		status,
		search,
		page,
	}: {
		genre: string | undefined;
		status: PieceStatusType | undefined;
		search: string | undefined;
		page: number | undefined;
	}) {
		const params = {genre, status, search, page};

		const key = 'piece_list' + btoa(JSON.stringify(params));
		return makeStateKey<FetchAllResponse>(key);
	}

	private setValues(res: FetchAllResponse) {
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
