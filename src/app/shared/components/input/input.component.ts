import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'input[appInput]',
	template: '',
})
export class InputComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'px-4 py-3 bg-surface rounded-lg';
	}
}
