import {inject, Injectable, signal} from '@angular/core';
import {catchError, finalize, of} from 'rxjs';
import {RemovePieceFromListApi} from './remove-piece-from-list.api';

@Injectable({providedIn: 'root'})
export class RemovePieceFromListService {
	private readonly api = inject(RemovePieceFromListApi);

	isLoading = signal<boolean>(false);
	hasError = signal<boolean>(false);

	remove(id: string) {
		this.isLoading.set(true);
		return this.api.remove(id).pipe(
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
