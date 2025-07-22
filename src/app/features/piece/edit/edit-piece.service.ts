import {computed, inject, Injectable, signal} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {RequestStatus} from '@shared/lib';
import {catchError, defer, of, tap} from 'rxjs';
import {PiecesApi} from '../pieces.api';

@Injectable({providedIn: 'root'})
export class EditPieceService {
	private readonly api = inject(PiecesApi);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	edit(
		id: string,
		payload: {
			status?: PieceStatusType;
			score?: number;
			startedAt?: string;
			finishedAt?: string;
		},
	) {
		return defer(() => {
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
		});
	}

	resetStatus() {
		this._status.set('idle');
	}
}
