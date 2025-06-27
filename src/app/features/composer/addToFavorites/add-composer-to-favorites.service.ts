import {computed, inject, Injectable, signal} from '@angular/core';
import {RequestStatus} from '@shared/lib';
import {catchError, of, tap} from 'rxjs';
import {ComposerApi} from '../composer.api';

@Injectable({providedIn: 'root'})
export class AddComposerToFavoritesService {
	private readonly api = inject(ComposerApi);

	private readonly _status = signal<RequestStatus>('idle');

	readonly isLoading = computed(() => this._status() === 'loading');
	readonly hasError = computed(() => this._status() === 'error');
	readonly hasSuccess = computed(() => this._status() === 'success');

	add(id: string) {
		this._status.set('loading');
		return this.api.addToFavorites(id).pipe(
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
