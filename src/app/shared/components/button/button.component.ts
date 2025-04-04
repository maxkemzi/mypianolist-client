import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, Input} from '@angular/core';
import {TypographyComponent} from '../typography';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
	standalone: true,
})
export class ButtonComponent {
	@Input() class: string = '';
	@Input() variant: 'primary' | 'secondary' = 'primary';
	@Input({transform: booleanAttribute}) submit: boolean = false;
	@Input() element: 'button' | 'navlink' = 'button';
	@Input() href?: string;

	get classes(): string {
		return `py-2 px-7 font-semibold rounded-xl ${this.variant === 'primary' ? 'bg-primary' : 'bg-secondary'} ${this.class}`;
	}
}
