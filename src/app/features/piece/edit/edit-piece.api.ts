import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {EditPiecePayload} from './edit-piece.model';

@Injectable({providedIn: 'root'})
export class EditPieceApi {
	private readonly api = inject(Api);

	edit(id: string, body: EditPiecePayload) {
		return this.api.patch(`/users/pieces/${id}`, body);
	}
}
