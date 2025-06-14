import {inject, Injectable, signal} from '@angular/core';
import {catchError, finalize, of} from 'rxjs';
import {RemovePieceFromListApi} from './remove-piece-from-list.api';

@Injectable({providedIn: 'root'})
export class RemovePieceFromListService {
	private readonly api = inject(RemovePieceFromListApi);

	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	remove(id: string) {
		this._isLoading.set(true);
		this._hasError.set(false);
		return this.api.remove(id).pipe(
			catchError(() => {
				this._hasError.set(true);
				return of(null);
			}),
			finalize(() => {
				this._isLoading.set(false);
			}),
		);
	}
}
