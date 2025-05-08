import {isPlatformBrowser} from '@angular/common';
import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {catchError, map, of, tap} from 'rxjs';
import {AuthApi} from './auth.api';
import {AuthUser} from './auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
	private readonly api = inject(AuthApi);
	private readonly cookies = inject(CookieService);
	private readonly platformId = inject(PLATFORM_ID);
	user = signal<AuthUser | null | undefined>(undefined);

	signUp(body: {username: string; email: string; password: string}) {
		return this.api.signUp(body);
	}

	logIn(body: {username: string; password: string}) {
		return this.api.logIn(body).pipe(
			tap(data => {
				this.user.set(data.user);
				this.setAccessToken(data.accessToken);
			}),
		);
	}

	refresh() {
		if (!isPlatformBrowser(this.platformId)) {
			return of(null);
		}

		return this.api.refresh().pipe(
			tap(data => {
				this.user.set(data.user);
				this.setAccessToken(data.accessToken);
			}),
			map(data => data.user),
			catchError(() => {
				this.user.set(null);
				this.deleteAccessToken();

				return of(null);
			}),
		);
	}

	logOut() {
		return this.api.logOut().pipe(
			tap(() => {
				this.user.set(null);
				this.deleteAccessToken();
			}),
		);
	}

	getAccessToken(): string | undefined {
		const cookie = this.cookies.get('accessToken');
		return cookie || undefined;
	}

	private setAccessToken(token: string) {
		this.cookies.set('accessToken', token, {
			path: '/',
			secure: false,
			sameSite: 'Lax',
			expires: 1,
		});
	}

	private deleteAccessToken() {
		this.cookies.delete('accessToken', '/');
	}
}
