import {inject, Injectable, signal} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {catchError, finalize, of} from 'rxjs';
import {AddPieceToListApi} from './add-piece-to-list.api';

@Injectable({providedIn: 'root'})
export class AddPieceToListService {
	private readonly api = inject(AddPieceToListApi);

	private readonly _isLoading = signal<boolean>(false);
	private readonly _hasError = signal<boolean>(false);

	readonly isLoading = this._isLoading.asReadonly();
	readonly hasError = this._hasError.asReadonly();

	add(data: {
		id: string;
		status: PieceStatusType;
		score: number;
		startedAt: string;
		finishedAt: string;
	}) {
		this._isLoading.set(true);
		this._hasError.set(false);
		return this.api.add(data).pipe(
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
