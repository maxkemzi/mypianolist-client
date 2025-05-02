import {CommonModule} from '@angular/common';
import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {twMerge} from 'tailwind-merge';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	imports: [CommonModule, TypographyComponent, RouterLink],
})
export class LinkComponent {
	readonly linkClass = input<string>();
	readonly type = input<'external' | 'navigation'>('navigation');
	readonly href = input<string>();

	getLinkClasses(classes: string) {
		return twMerge(classes, this.linkClass());
	}
}
