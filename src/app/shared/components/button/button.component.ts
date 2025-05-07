import {Component, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {twJoin} from 'tailwind-merge';
import {
	TypographyColor,
	TypographyComponent,
	TypographySize,
} from '../typography';

@Component({
	selector: 'button[appButton], a[appButton]',
	templateUrl: './button.component.html',
	imports: [TypographyComponent],
})
export class ButtonComponent extends ClassMergeDirective {
	readonly variant = input<'primary' | 'outline'>('primary');
	readonly size = input<'md' | 'sm'>('md');

	protected override defaultClass(): string {
		return twJoin(
			'block font-semibold rounded-lg',
			this.size() === 'md' && 'py-2 px-7',
			this.size() === 'sm' && 'py-1.5 px-4',
			this.variant() === 'primary' && 'bg-primary',
			this.variant() === 'outline' && 'bg-primary/15',
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
