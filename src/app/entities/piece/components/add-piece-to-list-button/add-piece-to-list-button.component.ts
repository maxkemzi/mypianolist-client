import {Component, inject, input, output} from '@angular/core';
import {PieceStatusType} from '@entities/piece/piece.model';
import {PieceUtils} from '@entities/piece/piece.utils';
import {ButtonComponent} from '@shared/components';
import {ButtonColor, ButtonVariant} from '@shared/components/button';

@Component({
	selector: 'app-add-piece-to-list-button',
	templateUrl: './add-piece-to-list-button.component.html',
	imports: [ButtonComponent],
})
export class AddPieceToListButtonComponent {
	private readonly pieceUtils = inject(PieceUtils);

	readonly status = input<PieceStatusType>();
	readonly appClick = output<void>();

	get text() {
		const status = this.status();

		if (status) {
			return this.pieceUtils.statusToText(status);
		}

		return 'Add to List';
	}

	get buttonColor(): ButtonColor {
		const status = this.status();

		if (status) {
			return this.pieceUtils.statusToColor(status);
		}

		return 'primary';
	}

	get buttonVariant(): ButtonVariant {
		const status = this.status();

		if (status) {
			return 'outline';
		}

		return 'primary';
	}
}
