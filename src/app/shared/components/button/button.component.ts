import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {twMerge} from 'tailwind-merge';
import {
	TypographyColor,
	TypographyComponent,
	TypographySize,
} from '../typography';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
})
export class ButtonComponent {
	readonly variant = input<'primary' | 'outline'>('primary');
	readonly size = input<'md' | 'sm'>('md');
	readonly element = input<'button' | 'navlink'>('button');
	readonly submit = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly class = input<string>();
	readonly href = input<string>();
	readonly disabled = input<boolean>();

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
