import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {CompletePiece} from '@entities/piece';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchResponse = PaginationResponse<CompletePiece>;

@Injectable({providedIn: 'root'})
export class FetchAllPiecesApi extends Api {
	private readonly http = inject(HttpClient);

	fetch({
		search,
		genre,
		page,
		limit,
	}: {search?: string; genre?: string; page?: number; limit?: number} = {}) {
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

		return this.http.get<FetchResponse>(`${this.BASE_URL}/pieces`, {
			params: new HttpParams({fromObject: params}),
		});
	}
}
