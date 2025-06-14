import {HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {CompletePiece, PieceSort} from '@entities/piece';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchResponse = PaginationResponse<CompletePiece>;
export interface FetchParams {
	search?: string;
	genre?: string;
	page?: number;
	limit?: number;
	sort?: PieceSort;
}

@Injectable({providedIn: 'root'})
export class FetchAllPiecesApi {
	private readonly api = inject(Api);

	fetch({search, genre, page, limit, sort}: FetchParams = {}) {
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
		if (sort) {
			params['sort'] = sort;
		}

		return this.api.get<FetchResponse>('/pieces', {
			params: new HttpParams({fromObject: params}),
		});
	}
}
