import {Component, Input} from '@angular/core';
import {TypographyComponent} from '../typography';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
	standalone: true,
})
export class LinkComponent {
	@Input() type: 'external' | 'navigation' = 'navigation';
	@Input() class?: string;
	@Input() href?: string;

	get classes() {
		return twMerge(
			'border-b-1 border-transparent pb-0.5 hover:border-primary',
			this.class,
		);
	}
}
