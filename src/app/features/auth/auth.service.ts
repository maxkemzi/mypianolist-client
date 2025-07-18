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
	private readonly _isRefreshing = signal<boolean>(false);

	readonly user = this._user.asReadonly();
	readonly isRefreshing = this._isRefreshing.asReadonly();
	readonly isAuth = computed(() => this._user() != null);

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

	getAccessToken(): string | null {
		const cookie = this.cookies.get('accessToken');
		return cookie || null;
	}

	patchUser(payload: Partial<AuthUser>) {
		this._user.update(prev => (prev != null ? {...prev, ...payload} : null));
	}

	set(user: AuthUser, accessToken: string) {
		this.setUser(user);
		this.setAccessToken(accessToken);
	}

	private setUser(payload: AuthUser | null) {
		this._user.set(payload);
	}

	private setAccessToken(token: string) {
		this.cookies.set('accessToken', token, {
			path: '/',
			secure: false,
			sameSite: 'Lax',
			expires: 1,
		});
	}

	reset() {
		this._user.set(null);
		this.deleteAccessToken();
	}

	private deleteAccessToken() {
		this.cookies.delete('accessToken', '/');
	}
}
