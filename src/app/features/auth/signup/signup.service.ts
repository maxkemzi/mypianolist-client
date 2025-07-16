import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {AuthApi, AuthApiError} from '../auth.api';

@Injectable({providedIn: 'root'})
export class SignupService {
	private readonly api = inject(AuthApi);

	private readonly _status = signal<RequestStatus>('idle');
	private readonly _error = signal<AuthApiError | null>(null);

	readonly error = this._error.asReadonly();
	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	signUp(body: {username: string; email: string; password: string}) {
		this._status.set('loading');
		this._error.set(null);
		return this.api.signUp(body).pipe(
			tap(() => {
				this._status.set('success');
			}),
			catchError(e => {
				const {message, code} = e.error;
				this._error.set({message, code});

				this._status.set('error');

				return of();
			}),
		);
	}
}
