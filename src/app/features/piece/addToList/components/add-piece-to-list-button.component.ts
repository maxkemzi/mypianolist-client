import {booleanAttribute, Component, inject, input} from '@angular/core';
import {ButtonComponent} from '@shared/components';
import {AddPieceToListService} from '../add-piece-to-list.service';

@Component({
	selector: 'app-add-piece-to-list-button',
	templateUrl: './add-piece-to-list-button.component.html',
	imports: [ButtonComponent],
})
export class AddPieceToListButtonComponent {
	readonly service = inject(AddPieceToListService);

	pieceId = input.required<string>();
	isDisabled = input<boolean, unknown>(false, {transform: booleanAttribute});

	handleClick() {
		this.service.add(this.pieceId()).subscribe();
	}
}
