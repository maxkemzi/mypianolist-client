import {booleanAttribute, Component, input, output} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-dropdown-item',
	templateUrl: './dropdown-item.component.html',
	imports: [TypographyComponent],
})
export class DropdownItemComponent {
	readonly isActive = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly isDisabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly appClick = output<void>();
}
