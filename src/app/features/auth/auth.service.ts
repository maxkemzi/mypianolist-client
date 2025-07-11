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
	private readonly _isSigningUp = signal<boolean>(false);
	private readonly _isLoggingIn = signal<boolean>(false);
	private readonly _isRefreshing = signal<boolean>(false);
	private readonly _isLoggingOut = signal<boolean>(false);

	readonly user = this._user.asReadonly();
	readonly isSigningUp = this._isSigningUp.asReadonly();
	readonly isLoggingIn = this._isLoggingIn.asReadonly();
	readonly isRefreshing = this._isRefreshing.asReadonly();
	readonly isLoggingOut = this._isLoggingOut.asReadonly();
	readonly isAuth = computed(() => this._user() != null);

	signUp(body: {username: string; email: string; password: string}) {
		this._isSigningUp.set(true);
		return this.api.signUp(body).pipe(
			finalize(() => {
				this._isSigningUp.set(false);
			}),
		);
	}

	logIn(body: {username: string; password: string}) {
		this._isLoggingIn.set(true);
		return this.api.logIn(body).pipe(
			tap(data => {
				this._user.set(data.user);
				this.setAccessToken(data.accessToken);
			}),
			finalize(() => {
				this._isLoggingIn.set(false);
			}),
		);
	}

	refresh() {
		if (!isPlatformBrowser(this.platformId)) {
			return of();
		}

		this._isRefreshing.set(true);
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
				this._isRefreshing.set(false);
			}),
		);
	}

	logOut() {
		this._isLoggingOut.set(true);
		return this.api.logOut().pipe(
			tap(() => {
				this._user.set(null);
				this.deleteAccessToken();
			}),
			finalize(() => {
				this._isLoggingOut.set(false);
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

	patchUser(payload: Partial<AuthUser>) {
		this._user.update(prev => (prev != null ? {...prev, ...payload} : null));
	}
}
