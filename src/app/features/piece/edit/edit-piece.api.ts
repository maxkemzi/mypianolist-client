import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {EditPiecePayload} from './edit-piece.model';

@Injectable({providedIn: 'root'})
export class EditPieceApi extends Api {
	private readonly http = inject(HttpClient);

	edit(id: string, body: EditPiecePayload) {
		return this.http.patch(`${this.BASE_URL}/users/pieces/${id}`, body);
	}
}
