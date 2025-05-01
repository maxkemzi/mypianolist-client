import {booleanAttribute, Component, input, output} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-dropdown-item',
	templateUrl: './dropdown-item.component.html',
	imports: [TypographyComponent],
})
export class DropdownItemComponent {
	readonly disabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly onClick = output<void>();
}
