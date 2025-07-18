import {computed, inject, Injectable, signal} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthUser} from './auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
	private readonly cookies = inject(CookieService);

	private readonly _user = signal<AuthUser | null | undefined>(undefined);

	readonly user = this._user.asReadonly();
	readonly isAuth = computed(() => this._user() != null);

	getAccessToken(): string | null {
		const cookie = this.cookies.get('accessToken');
		return cookie || null;
	}

	patchUser(payload: Partial<AuthUser>) {
		this._user.update(prev => (prev != null ? {...prev, ...payload} : null));
	}

	set(user: AuthUser, accessToken: string) {
		this._user.set(user);
		this.setAccessToken(accessToken);
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
