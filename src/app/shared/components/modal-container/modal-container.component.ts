import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'div[appModalContainer]',
	templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'fixed inset-0 z-50 bg-black/30';
	}
}
