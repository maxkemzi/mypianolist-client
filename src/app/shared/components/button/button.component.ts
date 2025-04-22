import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {twMerge} from 'tailwind-merge';
import {TypographyColor, TypographyComponent} from '../typography';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
})
export class ButtonComponent {
	@Input() variant: 'primary' | 'outline' = 'primary';
	@Input() element: 'button' | 'navlink' = 'button';
	@Input({transform: booleanAttribute}) submit: boolean = false;
	@Input() class?: string;
	@Input() href?: string;
	@Input() disabled?: boolean;

	get classes(): string {
		return twMerge(
			'block py-2 px-7 font-semibold rounded-xl',
			this.variant === 'primary' && 'bg-primary',
			this.variant === 'outline' && 'bg-primary/15',
			this.class,
		);
	}

	get textColor(): TypographyColor {
		if (this.variant === 'outline') {
			return 'primary';
		}

		return 'text';
	}
}
