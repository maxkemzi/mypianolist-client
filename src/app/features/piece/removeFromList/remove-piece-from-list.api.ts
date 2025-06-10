import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class RemovePieceFromListApi extends Api {
	private readonly http = inject(HttpClient);

	remove(id: string) {
		return this.http.delete(`${this.BASE_URL}/users/pieces/${id}`);
	}
}
