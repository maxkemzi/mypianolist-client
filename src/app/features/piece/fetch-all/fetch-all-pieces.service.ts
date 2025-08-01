import {inject, Injectable} from '@angular/core';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, defer, finalize, map, Observable, of, tap} from 'rxjs';
import {PaginatedFetchService} from '../../paginated-fetch.service';
import {
	CompletePiecesResponse,
	PiecesFetchParams,
	PiecesApi,
} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchAllPiecesService extends PaginatedFetchService<CompletePiecesResponse> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly CACHE_PREFIX = 'pieces';

	fetch(
		params: PiecesFetchParams = {},
	): Observable<CompletePiecesResponse | null> {
		return defer(() => {
			this.resetValues();
			this.setIsLoading(true);
			this.setHasError(false);
			return this.api.fetchAll({limit: this.limit(), ...params}).pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, params),
					value => this.dataCache.set(this.CACHE_PREFIX, params, value),
				),
				tap(res => {
					this.setData(res.data.content);
					this.setMetadata(res.data);

					if (res.fromCache) {
						this.setIsLoading(false);
					}
				}),
				map(res => res.data),
				catchError(() => {
					this.setHasError(true);
					return of();
				}),
				finalize(() => {
					this.setIsLoading(false);
				}),
			);
		});
	}

	clearCache() {
		this.dataCache.removeByPrefix(this.CACHE_PREFIX);
	}
}
