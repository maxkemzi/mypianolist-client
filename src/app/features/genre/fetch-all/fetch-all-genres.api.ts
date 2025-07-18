import {inject, Injectable} from '@angular/core';
import {Genre} from '@entities/genre';
import {Api, PaginationResponse} from '@shared/lib';

export type GenresResponse = PaginationResponse<Genre>;

@Injectable({providedIn: 'root'})
export class FetchAllGenresApi {
	private readonly api = inject(Api);

	fetch() {
		return this.api.get<GenresResponse>('/pieces/genres');
	}
}
