import {computed, inject, Injectable, signal} from '@angular/core';
import {AuthService} from '@features/auth';
import {RequestStatus} from '@shared/lib';
import {ApiError} from '@shared/lib/api';
import {catchError, defer, of, tap} from 'rxjs';
import {UserProfileApi} from '../user-profile.api';

@Injectable({providedIn: 'root'})
export class DeleteAvatarService {
	private readonly api = inject(UserProfileApi);
	private readonly auth = inject(AuthService);

	private readonly _status = signal<RequestStatus>('idle');
	private readonly _error = signal<ApiError | null>(null);

	readonly error = this._error.asReadonly();
	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	delete() {
		return defer(() => {
			this._status.set('loading');
			this._error.set(null);
			return this.api.deleteAvatarByAuth().pipe(
				tap(({avatar}) => {
					this.auth.patchUser({avatar});
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

	resetStatus() {
		this._status.set('idle');
	}
}
