import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, finalize, of, tap} from 'rxjs';
import {EditPieceApi} from './edit-piece.api';
import {EditPiecePayload} from './edit-piece.model';

@Injectable({providedIn: 'root'})
export class EditPieceService {
	private readonly api = inject(EditPieceApi);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	edit(id: string, payload: EditPiecePayload) {
		this._status.set('loading');
		return this.api.edit(id, payload).pipe(
			tap(() => {
				this._status.set('success');
			}),
			catchError(() => {
				this._status.set('error');
				return of(null);
			}),
		);
	}

	resetStatus() {
		this._status.set('idle');
	}
}
