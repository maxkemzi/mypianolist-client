import {inject, Injectable} from '@angular/core';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {ComposerApi, ComposersResponse} from '../composer.api';
import {AuthService} from '@features/auth';
import {PaginatedFetchService} from '@features/paginated-fetch.service';

@Injectable({providedIn: 'root'})
export class FetchFavoriteComposersService extends PaginatedFetchService<ComposersResponse> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(ComposerApi);
	private readonly auth = inject(AuthService);
	private readonly CACHE_PREFIX = 'favorite_composers';

	fetchByAuth(): Observable<ComposersResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);

		const params = {username: this.auth.user()?.username};
		return this.api.fetchFavoriteByAuth().pipe(
			withCache(
				() => this.dataCache.get(this.CACHE_PREFIX, params),
				value => this.dataCache.set(this.CACHE_PREFIX, params, value),
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
