import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class RemoveComposerFromFavoritesApi {
	private readonly api = inject(Api);

	remove(id: string) {
		return this.api.delete(`/users/favorite-composers/${id}`);
	}
}
