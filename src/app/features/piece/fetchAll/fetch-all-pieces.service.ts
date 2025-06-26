import {inject, Injectable} from '@angular/core';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {FetchPiecesService} from '../fetch-pieces.service';
import {CompletePiecesResponse, FetchParams, PiecesApi} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchAllPiecesService extends FetchPiecesService<
	CompletePiecesResponse,
	FetchParams
> {
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);
	private readonly CACHE_PREFIX = 'pieces';

	fetch(params: FetchParams = {}): Observable<CompletePiecesResponse | null> {
		this._isLoading.set(true);
		this._hasError.set(false);
		return this.api.fetchAll({limit: this._limit(), ...params}).pipe(
			withCache(
				() => this.dataCache.get(this.CACHE_PREFIX, params),
				value => this.dataCache.set(this.CACHE_PREFIX, params, value),
			),
			tap(res => {
				this.setValues(res.data);

				if (res.fromCache) {
					this._isLoading.set(false);
				}
			}),
			map(res => res.data),
			catchError(() => {
				this._hasError.set(true);
				this.resetValues();
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
