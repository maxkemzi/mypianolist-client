import {Component, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'div[appContainer]',
	templateUrl: './container.component.html',
})
export class ContainerComponent extends ClassMergeDirective {
	readonly size = input<'md' | 'lg'>('lg');

	protected override defaultClass(): string {
		return twJoin(
			'mx-auto px-4',
			this.size() === 'lg' && 'max-w-[1472px]',
			this.size() === 'md' && 'max-w-[1058px]',
		);
	}
}
