import {Component, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'input[appInput], textarea[appInput]',
	template: '',
})
export class InputComponent extends ClassMergeDirective {
	readonly size = input<'sm' | 'md'>('md');

	protected override defaultClass(): string {
		return twJoin(
			'block bg-surface rounded-lg',
			this.size() === 'sm' && 'px-3 py-2',
			this.size() === 'md' && 'px-4 py-3',
		);
	}
}
