import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'div[appModalContainer]',
	templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/30 flex items-center justify-center';
	}
}
