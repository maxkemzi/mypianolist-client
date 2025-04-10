import {booleanAttribute, Component, Input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	standalone: true,
})
export class InputComponent {
	@Input() class?: string;
	@Input() value: string = '';
	@Input() type: 'text' | 'password' = 'text';
	@Input() placeholder?: string;
	@Input({transform: booleanAttribute}) disabled?: boolean;
	@Input() onInput: (event: Event) => void = () => {};
	@Input() onTouched: () => void = () => {};

	get classes(): string {
		return twMerge('px-4 py-3 bg-surface rounded-xl', this.class);
	}
}
