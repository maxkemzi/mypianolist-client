import {inject, Injectable, signal} from '@angular/core';
import {PieceStatusType} from '@entities/piece';
import {catchError, finalize, of} from 'rxjs';
import {AddPieceToListApi} from './add-piece-to-list.api';

@Injectable({providedIn: 'root'})
export class AddPieceToListService {
	private readonly api = inject(AddPieceToListApi);

	isLoading = signal<boolean>(false);
	hasError = signal<boolean>(false);

	add(data: {
		id: string;
		status: PieceStatusType;
		score: number;
		startedAt: string;
		finishedAt: string;
	}) {
		this.isLoading.set(true);
		return this.api.add(data).pipe(
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
