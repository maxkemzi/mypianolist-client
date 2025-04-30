import {Component, HostBinding, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
	readonly class = input<string>();

	@HostBinding('class')
	get classes() {
		return twMerge('min-w-full', this.class());
	}
}
