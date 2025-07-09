import {isPlatformBrowser} from '@angular/common';
import {computed, inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {catchError, finalize, map, of, tap} from 'rxjs';
import {AuthApi} from './auth.api';
import {AuthUser} from './auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
	private readonly api = inject(AuthApi);
	private readonly cookies = inject(CookieService);
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _user = signal<AuthUser | null | undefined>(undefined);
	private readonly _isLoading = signal<boolean>(false);

	readonly user = this._user.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly isAuth = computed(() => this._user() != null);

	signUp(body: {username: string; email: string; password: string}) {
		return this.api.signUp(body);
	}

	logIn(body: {username: string; password: string}) {
		return this.api.logIn(body).pipe(
			tap(data => {
				this._user.set(data.user);
				this.setAccessToken(data.accessToken);
			}),
		);
	}

	refresh() {
		if (!isPlatformBrowser(this.platformId)) {
			return of();
		}

		this._isLoading.set(true);
		return this.api.refresh().pipe(
			tap(data => {
				this._user.set(data.user);
				this.setAccessToken(data.accessToken);
			}),
			map(data => data.user),
			catchError(() => {
				this._user.set(null);
				this.deleteAccessToken();

				return of();
			}),
			finalize(() => {
				this._isLoading.set(false);
			}),
		);
	}

	logOut() {
		return this.api.logOut().pipe(
			tap(() => {
				this._user.set(null);
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
