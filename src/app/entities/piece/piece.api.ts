import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {Piece} from './piece.model';

interface FetchAllPiecesResponse {
	content: Piece[];
}

@Injectable({providedIn: 'root'})
export class PieceApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll() {
		return this.http.get<FetchAllPiecesResponse>(`${this.BASE_URL}/pieces`);
	}
}
