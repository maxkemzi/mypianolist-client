import {inject, Injectable} from '@angular/core';
import {UserProfile} from '@entities/user/profile';
import {Api} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class UserProfileApi {
	private readonly api = inject(Api);

	fetchByAuth() {
		return this.api.get<UserProfile>('/users/profile');
	}

	fetchByUsername(username: string) {
		return this.api.get<UserProfile>(`/users/${username}/profile`);
	}

	updateAvatarByAuth(avatar: File) {
		const formData = new FormData();
		formData.append('avatar', avatar);

		return this.api.post<UserProfile>('/users/profile/avatar', formData);
	}

	updateBiographyByAuth(biography: string) {
		return this.api.patch<UserProfile>('/users/profile', {biography});
	}
}
