import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, defer, of, tap} from 'rxjs';
import {AuthApi, AuthApiError} from '../auth.api';
import {AuthService} from '../auth.service';

@Injectable({providedIn: 'root'})
export class LoginService {
	private readonly api = inject(AuthApi);
	private readonly auth = inject(AuthService);

	private readonly _status = signal<RequestStatus>('idle');
	private readonly _error = signal<AuthApiError | null>(null);

	readonly error = this._error.asReadonly();
	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	logIn(body: {username: string; password: string}) {
		return defer(() => {
			this._status.set('loading');
			this._error.set(null);
			return this.api.logIn(body).pipe(
				tap(data => {
					this.auth.set(data.user, data.accessToken);
					this._status.set('success');
				}),
				catchError(e => {
					const {message, code} = e.error;
					this._error.set({message, code});

					this._status.set('error');

					return of();
				}),
			);
		});
	}
}
