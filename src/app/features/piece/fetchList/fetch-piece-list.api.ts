import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {PieceStatusType, UserPiece} from '@entities/piece';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchResponse = PaginationResponse<UserPiece>;
export interface FetchParams {
	search?: string;
	genre?: string;
	status?: PieceStatusType;
	page?: number;
	limit?: number;
}

@Injectable({providedIn: 'root'})
export class FetchPieceListApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll({search, genre, page, limit, status}: FetchParams = {}) {
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

		return this.http.get<FetchResponse>(`${this.BASE_URL}/users/pieces`, {
			params: new HttpParams({fromObject: params}),
		});
	}
}
