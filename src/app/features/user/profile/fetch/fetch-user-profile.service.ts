import {inject, Injectable, signal} from '@angular/core';
import {UserProfile} from '@entities/user/profile';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, of, tap} from 'rxjs';
import {UserProfileApi} from '../user-profile.api';
import {AuthService} from '@features/auth';

@Injectable({providedIn: 'root'})
export class FetchUserProfileService {
	private readonly api = inject(UserProfileApi);
	private readonly dataCache = inject(DataCacheService);
	private readonly CACHE_PREFIX = 'profile';
	private readonly auth = inject(AuthService);

	private readonly _data = signal<UserProfile | null>(null);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetchWithAuth() {
		this._isLoading.set(true);
		this._hasError.set(false);

		const params = {username: this.auth.user()?.username};
		return this.api.fetchWithAuth().pipe(
			withCache(
				() => this.dataCache.get(this.CACHE_PREFIX, params),
				value => this.dataCache.set(this.CACHE_PREFIX, params, value),
			),
			tap(res => {
				this._data.set(res.data);

				if (res.fromCache) {
					this._isLoading.set(false);
				}
			}),
			catchError(() => {
				this._hasError.set(true);
				this._data.set(null);
				return of();
			}),
			finalize(() => {
				this._isLoading.set(false);
			}),
		);
	}

	clearCache() {
		this.dataCache.removeByPrefix(this.CACHE_PREFIX);
	}
}
