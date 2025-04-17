import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Api} from '../../lib';

interface LoginResponse {
	user: {username: string; avatar: string | null};
	accessToken: string;
}

@Injectable({providedIn: 'root'})
export class AuthApi extends Api {
	constructor(private http: HttpClient) {
		super();
	}

	logIn(body: {username: string; password: string}) {
		return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, body);
	}

	signUp(body: {username: string; email: string; password: string}) {
		return this.http.post(`${this.BASE_URL}/auth/register`, body);
	}

	refresh() {
		return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/refresh`, {});
	}
}
