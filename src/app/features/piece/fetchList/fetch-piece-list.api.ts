import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {PieceStatus} from '@entities/piece';
import {UserPiece} from '@entities/piece/piece.model';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchAllResponse = PaginationResponse<UserPiece>;

@Injectable({providedIn: 'root'})
export class FetchPieceListApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll({
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

		return this.http.get<FetchAllResponse>(`${this.BASE_URL}/users/pieces`, {
			params: new HttpParams({fromObject: params}),
		});
	}
}
