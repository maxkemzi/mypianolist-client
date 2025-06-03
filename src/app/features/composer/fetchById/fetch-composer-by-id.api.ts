import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Composer} from '@entities/composer';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdApi extends Api {
	private readonly http = inject(HttpClient);

	fetchById(id: string) {
		return this.http.get<Composer>(`${this.BASE_URL}/composers/${id}`);
	}
}
