import {inject, Injectable, signal} from '@angular/core';
import {CompletePiece} from '@entities/piece';
import {DataCacheService, withCache} from '@shared/lib';
import {catchError, finalize, of, tap} from 'rxjs';
import {PiecesApi} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class FetchPieceByIdService {
	private readonly api = inject(PiecesApi);
	private readonly dataCache = inject(DataCacheService);
	private readonly CACHE_PREFIX = 'piece';

	private readonly _data = signal<CompletePiece | null>(null);
	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly data = this._data.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	fetch(id: string) {
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
	}

	clearCache() {
		this.dataCache.removeByPrefix(this.CACHE_PREFIX);
	}
}
