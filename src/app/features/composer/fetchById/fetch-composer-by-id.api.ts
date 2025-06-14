import {inject, Injectable} from '@angular/core';
import {Composer} from '@entities/composer';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdApi {
	private readonly api = inject(Api);

	fetchById(id: string) {
		return this.api.get<Composer>(`/composers/${id}`);
	}
}
