import {effect, inject, Injectable} from '@angular/core';
import {NotificationAlertService} from '@features/notification-alert';
import {AddPieceToFavoritesService} from '@features/piece/addToFavorites/add-piece-to-favorites.service';
import {AddPieceToListService} from '@features/piece/addToList/add-piece-to-list.service';
import {EditPieceService} from '@features/piece/edit/edit-piece.service';
import {RemovePieceFromListService} from '@features/piece/removeFromList/remove-piece-from-list.service';

@Injectable({providedIn: 'root'})
export class ErrorHandlingService {
	private readonly notificationAlert = inject(NotificationAlertService);
	private readonly addPieceToList = inject(AddPieceToListService);
	private readonly editPiece = inject(EditPieceService);
	private readonly removePieceFromList = inject(RemovePieceFromListService);
	private readonly addPieceToFavorites = inject(AddPieceToFavoritesService);

	constructor() {
		effect(() => {
			if (this.addPieceToList.hasError()) {
				this.notificationAlert.showError('Error adding piece to the list.');
			}
			if (this.addPieceToList.hasSuccess()) {
				this.notificationAlert.showSuccess(
					'Piece added to the list successfully.',
				);
			}

			this.addPieceToList.resetStatus();
		});

		effect(() => {
			if (this.editPiece.hasError()) {
				this.notificationAlert.showError('Error editing piece.');
			}
			if (this.editPiece.hasSuccess()) {
				this.notificationAlert.showSuccess('Piece edited successfully.');
			}

			this.editPiece.resetStatus();
		});

		effect(() => {
			if (this.removePieceFromList.hasError()) {
				this.notificationAlert.showError(
					'Error removing piece from the list.',
				);
			}
			if (this.removePieceFromList.hasSuccess()) {
				this.notificationAlert.showSuccess(
					'Piece removed from the list successfully.',
				);
			}

			this.removePieceFromList.resetStatus();
		});

		effect(() => {
			if (this.addPieceToFavorites.hasError()) {
				this.notificationAlert.showError(
					'Error adding piece to favorites.',
				);
			}
			if (this.addPieceToFavorites.hasSuccess()) {
				this.notificationAlert.showSuccess(
					'Piece added to your favorites successfully.',
				);
			}

			this.addPieceToFavorites.resetStatus();
		});
	}
}
