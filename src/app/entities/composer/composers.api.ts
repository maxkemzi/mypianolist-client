import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {Composer} from './composer.model';

@Injectable({providedIn: 'root'})
export class ComposersApi extends Api {
	private readonly http = inject(HttpClient);

	fetchById(id: string) {
		return this.http.get<Composer>(`${this.BASE_URL}/composers/${id}`);
	}
}
