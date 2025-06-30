import {inject, Injectable} from '@angular/core';
import {Genre} from '@entities/genre';
import {Api, PaginationResponse} from '@shared/lib';

export type FetchResponse = PaginationResponse<Genre>;

@Injectable({providedIn: 'root'})
export class FetchAllGenresApi {
	private readonly api = inject(Api);

	fetch() {
		return this.api.get<FetchResponse>('/pieces/genres');
	}
}
