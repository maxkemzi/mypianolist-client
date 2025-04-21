import {inject, Injectable, signal} from '@angular/core';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {catchError, of, tap} from 'rxjs';
import {AuthApi} from './auth.api';

interface User {
	username: string;
	avatar: string | null;
}

@Injectable({providedIn: 'root'})
export class AuthService {
	private readonly api = inject(AuthApi);
	private readonly cookies = inject(SsrCookieService);
	user = signal<User | null | undefined>(undefined);

	signUp(body: {username: string; email: string; password: string}) {
		return this.api.signUp(body);
	}

	logIn(body: {username: string; password: string}) {
		return this.api.logIn(body).pipe(tap(data => this.setAuthData(data)));
	}

	refresh() {
		return this.api.refresh().pipe(
			tap(data => {
				this.setAuthData(data);
			}),
			catchError(() => {
				this.user.set(null);

				return of(null);
			}),
		);
	}

	private setAuthData(data: {user: User; accessToken: string}) {
		this.cookies.set('token', data.accessToken, {
			path: '/',
			secure: false,
			sameSite: 'Lax',
			expires: 1,
		});
		this.user.set(data.user);
	}

	getAuthToken(): string {
		return this.cookies.get('token');
	}
}
