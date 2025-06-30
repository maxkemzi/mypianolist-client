import {inject, Injectable} from '@angular/core';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {PaginatedFetchService} from '../../paginated-fetch.service';
import {FetchParams, PiecesApi, UserPiecesResponse} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceListService extends PaginatedFetchService<UserPiecesResponse> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly CACHE_PREFIX = 'piece_list';

	fetch(params: FetchParams = {}): Observable<UserPiecesResponse | null> {
		this.setIsLoading(true);
		this.setHasError(false);
		return this.api.fetchList({limit: this.limit(), ...params}).pipe(
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
