import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {UserProfileApi} from '../user-profile.api';
import {AuthService} from '@features/auth';

@Injectable({providedIn: 'root'})
export class UpdateBiographyService {
	private readonly api = inject(UserProfileApi);
	private readonly auth = inject(AuthService);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	update(biography: string) {
		this._status.set('loading');
		return this.api.updateBiographyByAuth(biography).pipe(
			tap(({biography}) => {
				this.auth.patchUser({biography});
				this._status.set('success');
			}),
			catchError(() => {
				this._status.set('error');
				return of();
			}),
		);
	}

	resetStatus() {
		this._status.set('idle');
	}
}
