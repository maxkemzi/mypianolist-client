import {booleanAttribute, Component, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
})
export class InputComponent {
	readonly class = input<string>();
	readonly value = input<string>('');
	readonly type = input<'text' | 'password'>('text');
	readonly placeholder = input<string>();
	readonly disabled = input<boolean, unknown>(undefined, {
		transform: booleanAttribute,
	});
	readonly onInput = input<(event: Event) => void>(() => {});
	readonly onTouched = input<() => void>(() => {});

	get classes(): string {
		return twMerge('px-4 py-3 bg-surface rounded-xl', this.class());
	}
}
