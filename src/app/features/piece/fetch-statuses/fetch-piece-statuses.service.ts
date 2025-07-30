import {inject, Injectable, signal} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, defer, finalize, map, Observable, of, tap} from 'rxjs';
import {PiecesApi} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceStatusesService {
	private readonly CACHE_PREFIX = 'statuses';
	private readonly dataCache = inject(DataCacheService);
	private readonly api = inject(PiecesApi);

	private readonly _data = signal<PieceStatusType[]>([]);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetch(): Observable<PieceStatusType[] | null> {
		return defer(() => {
			this._data.set([]);
			this._isLoading.set(true);
			this._hasError.set(false);
			return this.api.fetchStatuses().pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, {}),
					value => this.dataCache.set(this.CACHE_PREFIX, {}, value),
				),
				tap(res => {
					this._data.set(res.data);

					if (res.fromCache) {
						this._isLoading.set(false);
					}
				}),
				map(res => res.data),
				catchError(() => {
					this._hasError.set(true);
					return of();
				}),
				finalize(() => {
					this._isLoading.set(false);
				}),
			);
		});
	}
}
