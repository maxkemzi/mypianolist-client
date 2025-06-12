import {inject, Injectable} from '@angular/core';
import {tap, catchError, finalize, Observable, of} from 'rxjs';
import {FetchPiecesService} from '../fetch-pieces.service';
import {
	FetchAllPiecesApi,
	FetchParams,
	FetchResponse,
} from './fetch-all-pieces.api';
import {CachedFetchService} from '@shared/lib';

@Injectable({providedIn: 'root'})
export class FetchAllPiecesService extends FetchPiecesService<
	FetchResponse,
	FetchParams
> {
	private readonly cachedFetch = inject(CachedFetchService);
	private readonly api = inject(FetchAllPiecesApi);
	private readonly CACHE_PREFIX = 'pieces';

	fetch(params: FetchParams = {}): Observable<FetchResponse | null> {
		this.isLoading.set(true);
		this.hasError.set(false);
		return this.cachedFetch
			.buildFetch<
				FetchResponse,
				FetchParams
			>(this.api.fetch({limit: this.limit(), ...params}), {prefix: this.CACHE_PREFIX, params})
			.pipe(
				tap(res => {
					this.setValues(res);
				}),
				catchError(() => {
					this.hasError.set(true);
					this.resetValues();
					return of(null);
				}),
				finalize(() => {
					this.isLoading.set(false);
				}),
			);
	}

	clearCache() {
		this.cachedFetch.clearCache(this.CACHE_PREFIX);
	}
}
