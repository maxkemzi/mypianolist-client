import {CommonModule} from '@angular/common';
import {Component, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	imports: [CommonModule],
})
export class ContainerComponent {
	readonly class = input<string>();
	readonly size = input<'md' | 'lg'>('lg');

	get classes() {
		return twMerge(
			'mx-auto px-4',
			this.size() === 'lg' && 'max-w-[1472px]',
			this.size() === 'md' && 'max-w-[1058px]',
			this.class(),
		);
	}
}
