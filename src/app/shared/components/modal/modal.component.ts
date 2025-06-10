import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: '[appModal]',
	templateUrl: './modal.component.html',
})
export class ModalComponent extends ClassMergeDirective {
	protected override defaultClass() {
		return 'bg-background px-12 py-10 rounded-lg';
	}
}
