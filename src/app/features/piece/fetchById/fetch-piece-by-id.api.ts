import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {CompletePiece} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchPieceByIdApi extends Api {
	private readonly http = inject(HttpClient);

	fetchById(id: string) {
		return this.http.get<CompletePiece>(`${this.BASE_URL}/pieces/${id}`);
	}
}
