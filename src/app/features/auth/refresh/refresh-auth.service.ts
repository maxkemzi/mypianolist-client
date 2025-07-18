import {isPlatformBrowser} from '@angular/common';
import {computed, inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {AuthApi, AuthApiError} from '../auth.api';
import {AuthService} from '../auth.service';

@Injectable({providedIn: 'root'})
export class RefreshAuthService {
	private readonly api = inject(AuthApi);
	private readonly auth = inject(AuthService);
	private readonly platformId = inject(PLATFORM_ID);

	private readonly _status = signal<RequestStatus>('idle');
	private readonly _error = signal<AuthApiError | null>(null);

	readonly error = this._error.asReadonly();
	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	refresh() {
		if (!isPlatformBrowser(this.platformId)) {
			return of();
		}

		this._status.set('loading');
		return this.api.refresh().pipe(
			tap(data => {
				this.auth.set(data.user, data.accessToken);

				this._status.set('success');
			}),
			catchError(() => {
				this.auth.reset();

				this._status.set('error');

				return of();
			}),
		);
	}
}
