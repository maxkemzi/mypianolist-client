import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {Piece} from './piece.model';

export interface FetchAllPiecesResponse {
	content: Piece[];
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}

@Injectable({providedIn: 'root'})
export class PieceApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll({search, genre}: {search?: string; genre?: string} = {}) {
		let params = new HttpParams();

		if (search) {
			params = params.set('search', search);
		}

		if (genre) {
			params = params.set('genre', genre);
		}

		return this.http.get<FetchAllPiecesResponse>(`${this.BASE_URL}/pieces`, {
			params,
		});
	}
}
