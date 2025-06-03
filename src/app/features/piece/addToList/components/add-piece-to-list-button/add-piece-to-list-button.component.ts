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
	readonly service = inject(AddPieceToListService);

	isDisabled = input<boolean, unknown>(false, {transform: booleanAttribute});
	appClick = output<void>();
}
