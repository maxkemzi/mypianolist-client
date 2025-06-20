import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class AddComposerToFavoritesApi {
	private readonly api = inject(Api);

	add(id: string) {
		return this.api.post('/users/favorite-composers', {
			composerId: id,
		});
	}
}
