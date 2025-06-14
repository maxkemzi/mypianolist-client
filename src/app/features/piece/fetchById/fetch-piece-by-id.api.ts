import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {CompletePiece} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchPieceByIdApi {
	private readonly api = inject(Api);

	fetchById(id: string) {
		return this.api.get<CompletePiece>(`/pieces/${id}`);
	}
}
