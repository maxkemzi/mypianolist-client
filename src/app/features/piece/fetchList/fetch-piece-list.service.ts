import {inject, Injectable} from '@angular/core';
import {CachedFetchService} from '@shared/lib';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {FetchPiecesService} from '../fetch-pieces.service';
import {
	FetchParams,
	FetchPieceListApi,
	FetchResponse,
} from './fetch-piece-list.api';

@Injectable({providedIn: 'root'})
export class FetchPieceListService extends FetchPiecesService<
	FetchResponse,
	FetchParams
> {
	private readonly cachedFetch = inject(CachedFetchService);
	private readonly api = inject(FetchPieceListApi);
	private readonly CACHE_PREFIX = 'piece_list';

	fetch(params: FetchParams = {}): Observable<FetchResponse | null> {
		this.isLoading.set(true);
		this.hasError.set(false);
		return this.cachedFetch
			.buildFetch<
				FetchResponse,
				FetchParams
			>(this.api.fetchAll({limit: this.limit(), ...params}), {prefix: this.CACHE_PREFIX, params})
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
