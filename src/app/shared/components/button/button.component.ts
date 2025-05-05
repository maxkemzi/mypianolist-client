import {CommonModule} from '@angular/common';
import {Component, HostBinding, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';
import {
	TypographyColor,
	TypographyComponent,
	TypographySize,
} from '../typography';

@Component({
	selector: 'button[appButton], a[appButton]',
	templateUrl: './button.component.html',
	imports: [CommonModule, TypographyComponent],
})
export class ButtonComponent {
	readonly class = input<string>();
	readonly variant = input<'primary' | 'outline'>('primary');
	readonly size = input<'md' | 'sm'>('md');

	@HostBinding('class')
	get classes(): string {
		return twMerge(
			'block font-semibold rounded-lg',
			this.size() === 'md' && 'py-2 px-7',
			this.size() === 'sm' && 'py-1.5 px-4',
			this.variant() === 'primary' && 'bg-primary',
			this.variant() === 'outline' && 'bg-primary/15',
			this.class(),
		);
	}

	get textColor(): TypographyColor {
		if (this.variant() === 'outline') {
			return 'primary';
		}

		return 'text';
	}

	get textSize(): TypographySize {
		if (this.size() === 'sm') {
			return 'sm';
		}

		return 'base';
	}
}
