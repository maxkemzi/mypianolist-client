import {Injectable} from '@angular/core';
import {AuthApi} from './auth.api';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, EMPTY, finalize, map, of, tap} from 'rxjs';

interface User {
	username: string;
	avatar: string | null;
}

@Injectable({providedIn: 'root'})
export class AuthService {
	private userSubject = new BehaviorSubject<User | null>(null);
	user$ = this.userSubject.asObservable();

	isAuth$ = this.user$.pipe(map(user => !!user));

	private loadingSubject = new BehaviorSubject(true);
	loading$ = this.loadingSubject.asObservable();

	constructor(
		private readonly api: AuthApi,
		private readonly cookieService: CookieService,
	) {}

	initAuth() {
		const token = this.cookieService.get('token');
		if (!token) {
			this.userSubject.next(null);
			this.loadingSubject.next(false);
			return Promise.resolve();
		}

		return new Promise<void>((resolve, reject) => {
			this.refresh()
				.pipe(finalize(() => this.loadingSubject.next(false)))
				.subscribe({
					next: data => {
						this.setAuthData(data);
						console.log(data);
						resolve();
					},
					error: err => {
						reject(err);
					},
				});
		});
	}

	logIn(body: {username: string; password: string}) {
		return this.api.logIn(body).pipe(tap(data => this.setAuthData(data)));
	}

	refresh() {
		return this.api.refresh().pipe(tap(data => this.setAuthData(data)));
	}

	private setAuthData(data: {user: User; accessToken: string}) {
		this.cookieService.set('token', data.accessToken, {
			path: '/',
			secure: false,
			sameSite: 'Lax',
			expires: 1,
		});
		this.userSubject.next(data.user);
	}
}
