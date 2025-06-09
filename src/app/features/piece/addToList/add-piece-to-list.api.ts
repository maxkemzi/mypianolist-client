import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class AddPieceToListApi extends Api {
	private readonly http = inject(HttpClient);

	add({
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
		return this.http.post(`${this.BASE_URL}/users/pieces`, {
			pieceId: id,
			status,
			score,
			startedAt,
			finishedAt,
		});
	}
}
