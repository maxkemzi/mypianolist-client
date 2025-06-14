import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class RemovePieceFromListApi {
	private readonly api = inject(Api);

	remove(id: string) {
		return this.api.delete(`/users/pieces/${id}`);
	}
}
