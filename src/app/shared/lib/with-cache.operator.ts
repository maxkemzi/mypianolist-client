import {Observable, catchError, defer, map, of, tap} from 'rxjs';

export function withCache<T>(
	getCache: () => T | null | undefined,
	setCache: (value: T) => void,
): (source: Observable<T>) => Observable<{data: T; fromCache: boolean}> {
	return (source$: Observable<T>) =>
		defer(() => {
			const cached = getCache();

			if (cached) {
				return new Observable<{data: T; fromCache: boolean}>(subscriber => {
					subscriber.next({data: cached, fromCache: true});

					source$
						.pipe(
							tap(fresh => {
								setCache(fresh);
								subscriber.next({data: fresh, fromCache: false});
							}),
							catchError(() => {
								return of();
							}),
						)
						.subscribe({
							complete: () => subscriber.complete(),
							error: err => subscriber.error(err),
						});
				});
			} else {
				return source$.pipe(
					tap(setCache),
					map(fresh => ({data: fresh, fromCache: false})),
				);
			}
		});
}
