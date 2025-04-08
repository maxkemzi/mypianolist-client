import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	imports: [CommonModule],
	standalone: true,
})
export class ContainerComponent {
	@Input() class?: string;
	@Input() size: 'md' | 'lg' = 'lg';

	get classes() {
		return twMerge(
			'mx-auto px-4',
			this.size === 'lg' && 'max-w-[1472px]',
			this.size === 'md' && 'max-w-[1058px]',
			this.class,
		);
	}
}
