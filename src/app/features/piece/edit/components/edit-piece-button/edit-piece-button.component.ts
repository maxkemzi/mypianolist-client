import {
	booleanAttribute,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import {EditPieceService} from '../../edit-piece.service';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-edit-piece-button',
	templateUrl: './edit-piece-button.component.html',
	imports: [TypographyComponent],
})
export class EditPieceButtonComponent {
	private readonly service = inject(EditPieceService);

	readonly isDisabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly appClick = output<void>();

	readonly isLoading = this.service.isLoading.asReadonly();
}
