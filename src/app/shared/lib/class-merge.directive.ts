import {Directive, HostBinding, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Directive()
export abstract class ClassMergeDirective {
	readonly class = input<string>();

	@HostBinding('class')
	get classes() {
		return twMerge(this.defaultClass(), this.class());
	}

	protected abstract defaultClass(): string;
}
