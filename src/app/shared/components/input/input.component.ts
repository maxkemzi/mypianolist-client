import {Component, HostBinding, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'input[appInput]',
	template: '',
})
export class InputComponent {
	readonly class = input<string>();

	@HostBinding('class')
	get classes(): string {
		return twMerge('px-4 py-3 bg-surface rounded-lg', this.class());
	}
}
