import {Component, output} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-dropdown-item',
	templateUrl: './dropdown-item.component.html',
	imports: [TypographyComponent],
})
export class DropdownItemComponent {
	readonly click = output<void>();

	handleClick() {
		this.click.emit();
	}
}
