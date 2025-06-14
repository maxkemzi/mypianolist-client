import {inject, Injectable} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchPieceStatusesApi {
	private readonly api = inject(Api);

	fetch() {
		return this.api.get<PieceStatusType[]>('/users/pieces/statuses');
	}
}
