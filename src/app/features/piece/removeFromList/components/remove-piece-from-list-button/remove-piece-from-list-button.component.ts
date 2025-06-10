import {
	booleanAttribute,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import {RemovePieceFromListService} from '../../remove-piece-from-list.service';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-remove-piece-from-list-button',
	templateUrl: './remove-piece-from-list-button.component.html',
	imports: [TypographyComponent],
})
export class RemovePieceFromListButtonComponent {
	private readonly service = inject(RemovePieceFromListService);

	readonly isDisabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly appClick = output<void>();

	readonly isLoading = this.service.isLoading.asReadonly();
}
