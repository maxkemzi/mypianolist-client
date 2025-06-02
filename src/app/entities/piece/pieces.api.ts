import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {CompletePiece, Piece, PieceStatus, UserPiece} from './piece.model';

interface FetchPiecesResponse<T extends Piece> {
	content: T[];
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}

export type FetchAllPiecesResponse = FetchPiecesResponse<CompletePiece>;
export type FetchUserPiecesResponse = FetchPiecesResponse<UserPiece>;

@Injectable({providedIn: 'root'})
export class PiecesApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll({
		search,
		genre,
		page,
		limit,
	}: {search?: string; genre?: string; page?: number; limit?: number} = {}) {
		const params = this.createCommonParams({search, genre, page, limit});

		return this.http.get<FetchAllPiecesResponse>(`${this.BASE_URL}/pieces`, {
			params,
		});
	}

	fetchById(id: string) {
		return this.http.get<CompletePiece>(`${this.BASE_URL}/pieces/${id}`);
	}

	fetchStatuses() {
		return this.http.get<PieceStatus[]>(
			`${this.BASE_URL}/users/pieces/statuses`,
		);
	}

	fetchUserPieces({
		search,
		genre,
		page,
		limit,
		status,
	}: {
		search?: string;
		genre?: string;
		status?: PieceStatus;
		page?: number;
		limit?: number;
	} = {}) {
		let params = this.createCommonParams({search, genre, page, limit});

		if (status) {
			params = params.set('status', status);
		}

		return this.http.get<FetchUserPiecesResponse>(
			`${this.BASE_URL}/users/pieces`,
			{params},
		);
	}

	private createCommonParams({
		search,
		genre,
		page,
		limit,
	}: {
		search?: string;
		genre?: string;
		page?: number;
		limit?: number;
	}) {
		const params: Record<string, string | number> = {};

		if (search) {
			params['search'] = search;
		}
		if (genre) {
			params['genre'] = genre;
		}
		if (page) {
			params['page'] = page;
		}
		if (limit) {
			params['limit'] = limit;
		}

		return new HttpParams({fromObject: params});
	}

	createUserPiece(id: string) {
		return this.http.post(`${this.BASE_URL}/users/pieces`, {
			pieceId: id,
		});
	}
}
