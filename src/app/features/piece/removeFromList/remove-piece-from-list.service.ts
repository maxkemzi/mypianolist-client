import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {RemovePieceFromListApi} from './remove-piece-from-list.api';

@Injectable({providedIn: 'root'})
export class RemovePieceFromListService {
	private readonly api = inject(RemovePieceFromListApi);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	remove(id: string) {
		this._status.set('loading');
		return this.api.remove(id).pipe(
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
