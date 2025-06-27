import {inject, Injectable} from '@angular/core';
import {UserProfile} from '@entities/user/profile';
import {Api} from '@shared/lib';

type FetchResponse = UserProfile;

@Injectable({providedIn: 'root'})
export class UserProfileApi {
	private readonly api = inject(Api);

	fetchWithAuth() {
		return this.api.get<FetchResponse>('/users/profile');
	}
}
