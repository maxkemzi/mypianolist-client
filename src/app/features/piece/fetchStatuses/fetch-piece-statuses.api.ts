import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {PieceStatus} from '@entities/piece';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchPieceStatusesApi extends Api {
	private readonly http = inject(HttpClient);

	fetch() {
		return this.http.get<PieceStatus[]>(
			`${this.BASE_URL}/users/pieces/statuses`,
		);
	}
}
