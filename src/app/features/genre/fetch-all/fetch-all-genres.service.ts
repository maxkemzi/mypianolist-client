import {inject, Injectable} from '@angular/core';
import {PaginatedFetchService} from '@features/paginated-fetch.service';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, defer, finalize, map, Observable, of, tap} from 'rxjs';
import {FetchAllGenresApi, GenresResponse} from './fetch-all-genres.api';

@Injectable({providedIn: 'root'})
export class FetchAllGenresService extends PaginatedFetchService<GenresResponse> {
	private readonly CACHE_PREFIX = 'genres';
	private readonly api = inject(FetchAllGenresApi);
	private readonly dataCache = inject(DataCacheService);

	fetch(): Observable<GenresResponse | null> {
		return defer(() => {
			this.setIsLoading(true);
			this.setHasError(false);
			return this.api.fetch().pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, {}),
					value => this.dataCache.set(this.CACHE_PREFIX, {}, value),
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
		});
	}
}
