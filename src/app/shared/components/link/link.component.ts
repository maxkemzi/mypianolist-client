import {Component, input} from '@angular/core';
import {TypographyComponent} from '../typography';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
})
export class LinkComponent {
	readonly type = input<'external' | 'navigation'>('navigation');
	readonly class = input<string>();
	readonly href = input<string>();

	get classes() {
		return twMerge(
			'border-b-1 border-transparent pb-0.5 hover:border-primary',
			this.class(),
		);
	}
}
