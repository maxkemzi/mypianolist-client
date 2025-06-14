import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {AuthUser} from './auth.model';

interface AuthResponse {
	user: AuthUser;
	accessToken: string;
}

@Injectable({providedIn: 'root'})
export class AuthApi {
	private readonly api = inject(Api);

	logIn(body: {username: string; password: string}) {
		return this.api.post<AuthResponse>('/auth/login', body);
	}

	signUp(body: {username: string; email: string; password: string}) {
		return this.api.post('/auth/register', body);
	}

	refresh() {
		return this.api.post<AuthResponse>('/auth/refresh', {});
	}

	logOut() {
		return this.api.delete('/auth/logout', {});
	}
}
