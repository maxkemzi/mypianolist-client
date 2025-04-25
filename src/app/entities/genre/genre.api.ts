import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {Genre} from './genre.model';

interface FetchAllGenresResponse {
	content: Genre[];
}

@Injectable({providedIn: 'root'})
export class GenreApi extends Api {
	private readonly http = inject(HttpClient);

	fetchAll() {
		return this.http.get<FetchAllGenresResponse>(
			`${this.BASE_URL}/pieces/genres`,
		);
	}
}
