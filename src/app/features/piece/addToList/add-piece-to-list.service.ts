import {computed, inject, Injectable, signal} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {AddPieceToListApi} from './add-piece-to-list.api';

@Injectable({providedIn: 'root'})
export class AddPieceToListService {
	private readonly api = inject(AddPieceToListApi);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	add(data: {
		id: string;
		status: PieceStatusType;
		score: number;
		startedAt: string;
		finishedAt: string;
	}) {
		this._status.set('loading');
		return this.api.add(data).pipe(
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
