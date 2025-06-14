import {inject, Injectable} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class AddPieceToListApi {
	private readonly api = inject(Api);

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
		return this.api.post('/users/pieces', {
			pieceId: id,
			status,
			score,
			startedAt,
			finishedAt,
		});
	}
}
