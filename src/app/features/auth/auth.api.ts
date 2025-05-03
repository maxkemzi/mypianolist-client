import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';
import {AuthUser} from './auth.model';

interface AuthResponse {
	user: AuthUser;
	tokens: {access: string; refresh: string};
}

@Injectable({providedIn: 'root'})
export class AuthApi extends Api {
	private readonly http = inject(HttpClient);

	logIn(body: {username: string; password: string}) {
		return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, body);
	}

	signUp(body: {username: string; email: string; password: string}) {
		return this.http.post(`${this.BASE_URL}/auth/register`, body);
	}

	refresh() {
		return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/refresh`, {});
	}

	logOut() {
		return this.http.delete(`${this.BASE_URL}/auth/logout`, {});
	}
}
