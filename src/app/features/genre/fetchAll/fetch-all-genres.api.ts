import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Genre} from '@entities/genre';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchResponse = PaginationResponse<Genre>;

@Injectable({providedIn: 'root'})
export class FetchAllGenresApi extends Api {
	private readonly http = inject(HttpClient);

	fetch() {
		return this.http.get<FetchResponse>(`${this.BASE_URL}/pieces/genres`);
	}
}
