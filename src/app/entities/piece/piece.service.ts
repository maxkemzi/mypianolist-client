import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {FetchAllPiecesResponse, PieceApi} from './piece.api';
import {Piece} from './piece.model';
import {map, Observable, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PieceService {
	private readonly DATA_KEY = makeStateKey<FetchAllPiecesResponse>('pieces');
	private readonly INITIAL_RESPONSE: FetchAllPiecesResponse = {
		content: [],
		page: 0,
		limit: 10,
		totalCount: 0,
		totalPages: 1,
		hasMore: true,
	};
	private readonly api = inject(PieceApi);
	private readonly state = inject(TransferState);

	readonly data = signal<Piece[]>(this.INITIAL_RESPONSE.content);
	readonly page = signal<number>(this.INITIAL_RESPONSE.page);
	readonly limit = signal<number>(this.INITIAL_RESPONSE.limit);
	readonly totalCount = signal<number>(this.INITIAL_RESPONSE.totalCount);
	readonly totalPages = signal<number>(this.INITIAL_RESPONSE.totalPages);
	readonly hasMore = signal<boolean>(this.INITIAL_RESPONSE.hasMore);

	fetchAll({
		search,
	}: {search?: string} = {}): Observable<FetchAllPiecesResponse> {
		if (search === undefined && this.state.hasKey(this.DATA_KEY)) {
			const stored = this.state.get(this.DATA_KEY, this.INITIAL_RESPONSE);
			this.setResponseData(stored);
			return of(stored);
		}

		return this.api.fetchAll({search}).pipe(
			tap(res => {
				this.setResponseData(res);
				this.state.set<any>(this.DATA_KEY, res);
			}),
			map(res => res),
		);
	}

	private setResponseData(res: FetchAllPiecesResponse) {
		this.data.set(res.content);
		this.page.set(res.page);
		this.limit.set(res.limit);
		this.totalCount.set(res.totalCount);
		this.totalPages.set(res.totalPages);
		this.hasMore.set(res.hasMore);
	}
}
