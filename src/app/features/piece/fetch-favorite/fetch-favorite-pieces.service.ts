import {inject, Injectable} from '@angular/core';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {PaginatedFetchService} from '../../paginated-fetch.service';
import {
	CompletePiecesResponse,
	PiecesFetchParams,
	PiecesApi,
} from '../pieces.api';
import {AuthService} from '@features/auth';

@Injectable({providedIn: 'root'})
export class FetchFavoritePiecesService extends PaginatedFetchService<CompletePiecesResponse> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly auth = inject(AuthService);
	private readonly CACHE_PREFIX = 'favorite_pieces';

	fetchByAuth(
		params: PiecesFetchParams = {},
	): Observable<CompletePiecesResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);

		const completeParams = {...params, username: this.auth.user()?.username};
		return this.api
			.fetchFavoriteByAuth({limit: this.limit(), ...completeParams})
			.pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, completeParams),
					value =>
						this.dataCache.set(this.CACHE_PREFIX, completeParams, value),
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
		params: PiecesFetchParams = {},
	): Observable<CompletePiecesResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);

		const completeParams = {...params, username};
		return this.api
			.fetchFavoriteByUsername(username, {
				limit: this.limit(),
				...completeParams,
			})
			.pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, completeParams),
					value =>
						this.dataCache.set(this.CACHE_PREFIX, completeParams, value),
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
