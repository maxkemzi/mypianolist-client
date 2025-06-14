import {inject, Injectable, signal} from '@angular/core';
import {catchError, finalize, of} from 'rxjs';
import {EditPieceApi} from './edit-piece.api';
import {EditPiecePayload} from './edit-piece.model';

@Injectable({providedIn: 'root'})
export class EditPieceService {
	private readonly api = inject(EditPieceApi);

	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	edit(id: string, payload: EditPiecePayload) {
		this._isLoading.set(true);
		this._hasError.set(false);
		return this.api.edit(id, payload).pipe(
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
