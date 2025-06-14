import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Composer} from '@entities/composer';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdApi {
	private readonly api = inject(HttpClient);

	fetchById(id: string) {
		return this.api.get<Composer>(`/composers/${id}`);
	}
}
