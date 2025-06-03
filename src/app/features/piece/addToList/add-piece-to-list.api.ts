import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class AddPieceToListApi extends Api {
	private readonly http = inject(HttpClient);

	add(id: string) {
		return this.http.post(`${this.BASE_URL}/users/pieces`, {
			pieceId: id,
		});
	}
}
