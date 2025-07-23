import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '@features/auth/logout';
import {RequestStatus} from '@shared/lib';
import {catchError, defer, of, switchMap, tap} from 'rxjs';
import {UserApi} from '../user.api';
import {ApiError} from '@shared/lib/api';

type UpdatePasswordApiError = ApiError<'same_password'>;

@Injectable({providedIn: 'root'})
export class UpdatePasswordService {
	private readonly api = inject(UserApi);
	private readonly router = inject(Router);
	private readonly logout = inject(LogoutService);

	private readonly _status = signal<RequestStatus>('idle');
	private readonly _error = signal<UpdatePasswordApiError | null>(null);

	readonly error = this._error.asReadonly();
	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	update(password: string) {
		return defer(() => {
			this._status.set('loading');
			this._error.set(null);
			return this.api.updatePassword(password).pipe(
				switchMap(() =>
					this.logout.logOut().pipe(
						tap(() => {
							this._status.set('success');
							this.router.navigate(['/auth/login']);
						}),
					),
				),
				catchError(e => {
					const {message, code} = e.error;
					this._error.set({message, code});

					this._status.set('error');

					return of();
				}),
			);
		});
	}

	resetStatus() {
		this._status.set('idle');
	}
}
