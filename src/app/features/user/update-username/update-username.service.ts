import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '@features/auth/logout';
import {RequestStatus} from '@shared/lib';
import {catchError, of, switchMap, tap} from 'rxjs';
import {UserApi} from '../user.api';

@Injectable({providedIn: 'root'})
export class UpdateUsernameService {
	private readonly api = inject(UserApi);
	private readonly router = inject(Router);
	private readonly logout = inject(LogoutService);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	update(username: string) {
		this._status.set('loading');
		return this.api.updateUsername(username).pipe(
			switchMap(() =>
				this.logout.logOut().pipe(
					tap(() => {
						this._status.set('success');
						this.router.navigate(['/auth/login']);
					}),
				),
			),
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
