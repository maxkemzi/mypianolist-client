import {inject, Injectable} from '@angular/core';
import {AuthService} from '@features/auth';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {PaginatedFetchService} from '../../paginated-fetch.service';
import {
	PiecesApi,
	UserPiecesFetchParams,
	UserPiecesResponse,
} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceListService extends PaginatedFetchService<UserPiecesResponse> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly auth = inject(AuthService);
	private readonly CACHE_PREFIX = 'piece_list';

	fetchByAuth(
		params: UserPiecesFetchParams = {},
	): Observable<UserPiecesResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);

		const cacheParams = {...params, username: this.auth.user()?.username};
		return this.api.fetchListByAuth({limit: this.limit(), ...params}).pipe(
			withCache(
				() => this.dataCache.get(this.CACHE_PREFIX, cacheParams),
				value => this.dataCache.set(this.CACHE_PREFIX, cacheParams, value),
			),
			tap(res => {
				this.setValues(res.data);

				if (res.fromCache) {
					this.setIsLoading(false);
				}
			}),
			map(res => res.data),
			catchError(() => {
				this.setHasError(true);
				this.resetValues();
				return of();
			}),
			finalize(() => {
				this.setIsLoading(false);
			}),
		);
	}

	fetchByUsername(
		username: string,
		params: UserPiecesFetchParams = {},
	): Observable<UserPiecesResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);

		const cacheParams = {...params, username};
		return this.api
			.fetchListByUsername(username, {limit: this.limit(), ...params})
			.pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, cacheParams),
					value =>
						this.dataCache.set(this.CACHE_PREFIX, cacheParams, value),
				),
				tap(res => {
					this.setValues(res.data);

					if (res.fromCache) {
						this.setIsLoading(false);
					}
				}),
				map(res => res.data),
				catchError(() => {
					this.setHasError(true);
					this.resetValues();
					return of();
				}),
				finalize(() => {
					this.setIsLoading(false);
				}),
			);
	}

	clearCache() {
		this.dataCache.removeByPrefix(this.CACHE_PREFIX);
	}
}
