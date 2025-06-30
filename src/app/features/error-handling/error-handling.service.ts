import {effect, inject, Injectable} from '@angular/core';
import {AddComposerToFavoritesService} from '@features/composer/add-to-favorites';
import {RemoveComposerFromFavoritesService} from '@features/composer/remove-from-favorites';
import {NotificationAlertService} from '@features/notification-alert';
import {AddPieceToFavoritesService} from '@features/piece/add-to-favorites';
import {AddPieceToListService} from '@features/piece/add-to-list';
import {EditPieceService} from '@features/piece/edit';
import {RemovePieceFromFavoritesService} from '@features/piece/remove-from-favorites';
import {RemovePieceFromListService} from '@features/piece/remove-from-list';

@Injectable({providedIn: 'root'})
export class ErrorHandlingService {
	private readonly notificationAlert = inject(NotificationAlertService);

	constructor() {
		this.handleStatus(
			inject(AddPieceToListService),
			'Error adding piece to the list.',
			'Piece added to the list successfully.',
		);

		this.handleStatus(
			inject(EditPieceService),
			'Error editing piece.',
			'Piece edited successfully.',
		);

		this.handleStatus(
			inject(RemovePieceFromListService),
			'Error removing piece from the list.',
			'Piece removed from the list successfully.',
		);

		this.handleStatus(
			inject(AddPieceToFavoritesService),
			'Error adding piece to favorites.',
			'Piece added to your favorites successfully.',
		);

		this.handleStatus(
			inject(RemovePieceFromFavoritesService),
			'Error removing piece from favorites.',
			'Piece removed from your favorites successfully.',
		);

		this.handleStatus(
			inject(AddComposerToFavoritesService),
			'Error adding composer to favorites.',
			'Composer added to your favorites successfully.',
		);

		this.handleStatus(
			inject(RemoveComposerFromFavoritesService),
			'Error removing composer from favorites.',
			'Composer removed from your favorites successfully.',
		);
	}

	private handleStatus(
		service: {
			hasError: () => boolean;
			hasSuccess: () => boolean;
			resetStatus: () => void;
		},
		errorMessage: string,
		successMessage: string,
	) {
		effect(() => {
			if (service.hasError()) {
				this.notificationAlert.showError(errorMessage);
			}
			if (service.hasSuccess()) {
				this.notificationAlert.showSuccess(successMessage);
			}
			service.resetStatus();
		});
	}
}
