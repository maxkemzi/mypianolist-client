import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class RemovePieceFromFavoritesApi {
	private readonly api = inject(Api);

	remove(id: string) {
		return this.api.delete(`/users/favorite-pieces/${id}`);
	}
}
