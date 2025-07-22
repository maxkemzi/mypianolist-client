import {Injectable, inject, signal} from '@angular/core';
import {CompleteComposer} from '@entities/composer';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, defer, finalize, of, tap} from 'rxjs';
import {ComposerApi} from '../composer.api';

@Injectable({providedIn: 'root'})
export class FetchComposerByIdService {
	private readonly api = inject(ComposerApi);
	private readonly dataCache = inject(DataCacheService);
	private readonly CACHE_PREFIX = 'composer';

	private readonly _data = signal<CompleteComposer | null>(null);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetch(id: string) {
		return defer(() => {
			this._isLoading.set(true);
			this._hasError.set(false);
			return this.api.fetchById(id).pipe(
				withCache(
					() => this.dataCache.get(this.CACHE_PREFIX, {id}),
					value => this.dataCache.set(this.CACHE_PREFIX, {id}, value),
				),
				tap(res => {
					this._data.set(res.data);

					if (res.fromCache) {
						this._isLoading.set(false);
					}
				}),
				catchError(() => {
					this._hasError.set(true);
					this._data.set(null);
					return of();
				}),
				finalize(() => {
					this._isLoading.set(false);
				}),
			);
		});
	}
}
