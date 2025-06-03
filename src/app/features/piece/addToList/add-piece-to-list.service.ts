import {inject, Injectable, signal} from '@angular/core';
import {AddPieceToListApi} from './add-piece-to-list.api';
import {catchError, of, finalize} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddPieceToListService {
	private readonly api = inject(AddPieceToListApi);

	isLoading = signal<boolean>(false);
	hasError = signal<boolean>(false);

	add(id: string) {
		this.isLoading.set(true);
		return this.api.add(id).pipe(
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
