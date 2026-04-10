import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: '[appModal]',
	templateUrl: './modal.component.html',
})
export class ModalComponent extends ClassMergeDirective {
	protected override defaultClass() {
		return 'absolute top-1/2 left-1/2 -translate-1/2 w-max max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-y-auto bg-background px-12 py-10 rounded-lg max-sm:px-8 max-sm:py-6';
	}
}
