import {HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {
	CompletePiece,
	PieceSort,
	PieceStatusType,
	UserPiece,
} from '@entities/piece';
import {Api, PaginationResponse} from '@shared/lib';

export type CompletePiecesResponse = PaginationResponse<CompletePiece>;
export type UserPiecesResponse = PaginationResponse<UserPiece>;
export interface FetchParams {
	search?: string;
	genre?: string;
	page?: number;
	limit?: number;
	sort?: PieceSort;
	status?: PieceStatusType;
}

export interface PieceStatsResponse {
	total: number;
	statuses: {status: PieceStatusType; count: number}[];
}

@Injectable({providedIn: 'root'})
export class PiecesApi {
	private readonly api = inject(Api);

	fetchAll(params: FetchParams) {
		return this.api.get<CompletePiecesResponse>('/pieces', {
			params: this.buildParams(params),
		});
	}

	fetchListByAuth(params: FetchParams) {
		return this.api.get<UserPiecesResponse>('/users/pieces', {
			params: this.buildParams(params),
		});
	}

	fetchListByUsername(username: string, params: FetchParams) {
		return this.api.get<UserPiecesResponse>(`/users/${username}/pieces`, {
			params: this.buildParams(params),
		});
	}

	fetchFavoriteByAuth(params: FetchParams) {
		return this.api.get<CompletePiecesResponse>('/users/favorite-pieces', {
			params: this.buildParams(params),
		});
	}

	fetchFavoriteByUsername(username: string, params: FetchParams) {
		return this.api.get<CompletePiecesResponse>(
			`/users/${username}/favorite-pieces`,
			{params: this.buildParams(params)},
		);
	}

	private buildParams({
		search,
		genre,
		page,
		limit,
		status,
		sort,
	}: FetchParams = {}): HttpParams {
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
		if (status) {
			params['status'] = status;
		}
		if (sort) {
			params['sort'] = sort;
		}

		return new HttpParams({fromObject: params});
	}

	fetchById(id: string) {
		return this.api.get<CompletePiece>(`/pieces/${id}`);
	}

	fetchStatuses() {
		return this.api.get<PieceStatusType[]>('/users/pieces/statuses');
	}

	fetchStatsByAuth() {
		return this.api.get<PieceStatsResponse>('/users/pieces/stats');
	}

	fetchStatsByUsername(username: string) {
		return this.api.get<PieceStatsResponse>(
			`/users/${username}/pieces/stats`,
		);
	}

	edit(
		id: string,
		body: {
			status?: PieceStatusType;
			score?: number;
			startedAt?: string;
			finishedAt?: string;
		},
	) {
		return this.api.patch(`/users/pieces/${id}`, body);
	}

	addToList({
		id,
		status,
		score,
		startedAt,
		finishedAt,
	}: {
		id: string;
		status: PieceStatusType;
		score: number;
		startedAt: string;
		finishedAt: string;
	}) {
		return this.api.post('/users/pieces', {
			pieceId: id,
			status,
			score,
			startedAt,
			finishedAt,
		});
	}

	removeFromList(id: string) {
		return this.api.delete(`/users/pieces/${id}`);
	}

	addToFavorites(id: string) {
		return this.api.post('/users/favorite-pieces', {
			pieceId: id,
		});
	}

	removeFromFavorites(id: string) {
		return this.api.delete(`/users/favorite-pieces/${id}`);
	}
}
