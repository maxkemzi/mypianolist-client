import {booleanAttribute, Component, input, output} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
})
export class InputComponent {
	readonly inputClass = input<string>();
	readonly value = input<string>('');
	readonly type = input<'text' | 'password'>('text');
	readonly placeholder = input<string>();
	readonly disabled = input<boolean, unknown>(undefined, {
		transform: booleanAttribute,
	});
	readonly onInput = output<Event>();
	readonly onTouched = output<Event>();

	get inputClasses(): string {
		return twMerge('px-4 py-3 bg-surface rounded-lg', this.inputClass());
	}
}
