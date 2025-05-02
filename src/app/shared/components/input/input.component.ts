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

	getInputClasses(classes: string): string {
		return twMerge(classes, this.inputClass());
	}
}
