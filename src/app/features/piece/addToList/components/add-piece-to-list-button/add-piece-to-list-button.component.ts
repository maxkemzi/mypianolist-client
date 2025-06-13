import {
	booleanAttribute,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import {ButtonComponent} from '@shared/components';
import {AddPieceToListService} from '../../add-piece-to-list.service';

@Component({
	selector: 'app-add-piece-to-list-button',
	templateUrl: './add-piece-to-list-button.component.html',
	imports: [ButtonComponent],
})
export class AddPieceToListButtonComponent {
	private readonly service = inject(AddPieceToListService);

	readonly isDisabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly appClick = output<void>();
	readonly isLoading = this.service.isLoading.asReadonly();
}
