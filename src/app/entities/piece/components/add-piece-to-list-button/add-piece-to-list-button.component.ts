import {Component, inject, input, output} from '@angular/core';
import {PieceStatusType} from '@entities/piece/piece.model';
import {PieceUtils} from '@entities/piece/piece.utils';
import {ButtonComponent} from '@shared/components';
import {ThemeUtils} from '@shared/theme';

@Component({
	selector: 'app-add-piece-to-list-button',
	templateUrl: './add-piece-to-list-button.component.html',
	imports: [ButtonComponent],
})
export class AddPieceToListButtonComponent {
	private readonly pieceUtils = inject(PieceUtils);
	private readonly themeUtils = inject(ThemeUtils);

	readonly status = input<PieceStatusType>();
	readonly appClick = output<void>();

	get text() {
		const status = this.status();

		if (status) {
			return this.pieceUtils.statusToText(status);
		}

		return 'Add to List';
	}

	get bgColorClass() {
		const status = this.status();

		if (status) {
			const color = this.pieceUtils.statusToColor(status);
			return this.themeUtils.colorToBgClass(color);
		}

		return 'bg-primary';
	}
}
