import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class UserApi {
	private readonly api = inject(Api);

	updateUsername(username: string) {
		return this.api.post<void>('/users/username', {username});
	}
}
