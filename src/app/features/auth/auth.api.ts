import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Api} from '@shared/lib';

interface LoginResponse {
	user: {username: string; avatar: string | null};
	accessToken: string;
	refreshToken: string;
}

@Injectable({providedIn: 'root'})
export class AuthApi extends Api {
	private readonly http = inject(HttpClient);

	logIn(body: {username: string; password: string}) {
		return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, body);
	}

	signUp(body: {username: string; email: string; password: string}) {
		return this.http.post(`${this.BASE_URL}/auth/register`, body);
	}

	refresh() {
		return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/refresh`, {});
	}

	logOut() {
		return this.http.delete(`${this.BASE_URL}/auth/logout`, {});
	}
}
