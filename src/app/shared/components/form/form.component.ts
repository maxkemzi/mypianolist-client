import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'form[appForm]',
	templateUrl: './form.component.html',
})
export class FormComponent extends ClassMergeDirective {
	protected override defaultClass() {
		return 'bg-background p-12 rounded-lg';
	}
}
