import {inject, Injectable, signal} from '@angular/core';
import {catchError, finalize, of} from 'rxjs';
import {EditPieceApi} from './edit-piece.api';
import {EditPiecePayload} from './edit-piece.model';

@Injectable({providedIn: 'root'})
export class EditPieceService {
	private readonly api = inject(EditPieceApi);

	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);

	edit(id: string, payload: EditPiecePayload) {
		this.isLoading.set(true);
		this.hasError.set(false);
		return this.api.edit(id, payload).pipe(
			catchError(() => {
				this.hasError.set(true);
				return of(null);
			}),
			finalize(() => {
				this.isLoading.set(false);
			}),
		);
	}
}
