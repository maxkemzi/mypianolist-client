import {
	inject,
	Injectable,
	makeStateKey,
	signal,
	TransferState,
} from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {FetchAllPiecesResponse, PieceApi} from './piece.api';
import {Piece} from './piece.model';

@Injectable({providedIn: 'root'})
export class PiecesService {
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
		genre,
	}: {
		search?: string;
		genre?: string;
	} = {}): Observable<FetchAllPiecesResponse> {
		const key = this.getDataKey(genre);

		if (search === undefined && this.state.hasKey(key)) {
			const stored = this.state.get(key, this.INITIAL_RESPONSE);
			this.setResponseData(stored);
			return of(stored);
		}

		return this.api.fetchAll({search, genre}).pipe(
			tap(res => {
				this.setResponseData(res);
				this.state.set(key, res);
			}),
		);
	}

	private getDataKey(genre?: string) {
		return makeStateKey<FetchAllPiecesResponse>('pieces_' + (genre ?? 'all'));
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
