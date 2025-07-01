import {Component, output} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-dropdown-button',
	templateUrl: './dropdown-button.component.html',
	imports: [TypographyComponent],
})
export class DropdownButtonComponent {
	readonly appClick = output<void>();

	onClick() {
		this.appClick.emit();
	}
}
