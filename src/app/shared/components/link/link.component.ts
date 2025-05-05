import {CommonModule} from '@angular/common';
import {Component, HostBinding, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'a[appLink]',
	templateUrl: './link.component.html',
	imports: [CommonModule, TypographyComponent],
})
export class LinkComponent {
	readonly class = input<string>();

	@HostBinding('class')
	get classes() {
		return twMerge(
			'border-b-1 border-transparent pb-0.5 hover:border-primary',
			this.class(),
		);
	}
}
