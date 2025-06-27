import {inject, Injectable} from '@angular/core';
import {CompleteComposer, Composer} from '@entities/composer';
import {Api, PaginationResponse} from '@shared/lib';

export type ComposersResponse = PaginationResponse<Composer>;

@Injectable({providedIn: 'root'})
export class ComposerApi {
	private readonly api = inject(Api);

	fetchFavoriteByAuth() {
		return this.api.get<ComposersResponse>('/users/favorite-composers');
	}

	fetchFavoriteByUsername(username: string) {
		return this.api.get<ComposersResponse>(
			`/users/${username}/favorite-composers`,
		);
	}

	fetchById(id: string) {
		return this.api.get<CompleteComposer>(`/composers/${id}`);
	}

	addToFavorites(id: string) {
		return this.api.post('/users/favorite-composers', {
			composerId: id,
		});
	}

	removeFromFavorites(id: string) {
		return this.api.delete(`/users/favorite-composers/${id}`);
	}
}
