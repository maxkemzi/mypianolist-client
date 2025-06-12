import {inject, Injectable} from '@angular/core';
import {catchError, defer, iif, Observable, of, tap, throwError} from 'rxjs';
import {DataCacheService} from './data-cache.service';

@Injectable({providedIn: 'root'})
export class CachedFetchService {
	private readonly dataCache = inject(DataCacheService);

	buildFetch<T extends object, P extends object>(
		observable: Observable<T>,
		{prefix, params}: {prefix: string; params: P},
	): Observable<T> {
		return defer(() => {
			const cached = this.dataCache.get<T>(prefix, params);

			return iif(
				() => !!cached,
				of(cached!),
				observable.pipe(
					tap(res => this.dataCache.set<T>(prefix, params, res)),
					catchError(err => {
						this.dataCache.remove(prefix, params);
						return throwError(() => err);
					}),
				),
			);
		});
	}

	clearCache(prefix: string) {
		this.dataCache.removeByPrefix(prefix);
	}
}
