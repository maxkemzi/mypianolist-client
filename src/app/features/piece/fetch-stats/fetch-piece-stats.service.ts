import {inject, Injectable, signal} from '@angular/core';
import {AuthService} from '@features/auth';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, defer, finalize, of, tap} from 'rxjs';
import {PiecesApi, PieceStatsResponse} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceStatsService {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly CACHE_PREFIX = 'piece_stats';
	private readonly auth = inject(AuthService);

	private readonly _data = signal<PieceStatsResponse | null>(null);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetchByAuth() {
		return defer(() => {
			this._isLoading.set(true);
			this._hasError.set(false);

			const params = {username: this.auth.user()?.username};
			return this.api.fetchStatsByAuth().pipe(
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
		});
	}

	fetchByUsername(username: string) {
		return defer(() => {
			this._isLoading.set(true);
			this._hasError.set(false);

			const params = {username};
			return this.api.fetchStatsByUsername(username).pipe(
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
		});
	}

	clearCache() {
		this.dataCache.removeByPrefix(this.CACHE_PREFIX);
	}
}
