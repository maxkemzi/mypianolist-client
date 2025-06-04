import {inject, Injectable, signal} from '@angular/core';
import {AddPieceToListApi} from './add-piece-to-list.api';
import {catchError, of, finalize} from 'rxjs';
import {PieceStatus} from '@entities/piece';

@Injectable({providedIn: 'root'})
export class AddPieceToListService {
	private readonly api = inject(AddPieceToListApi);

	isLoading = signal<boolean>(false);
	hasError = signal<boolean>(false);

	add(data: {
		id: string;
		status: PieceStatus;
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
