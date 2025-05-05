import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'form[appForm]',
	templateUrl: './form.component.html',
	imports: [CommonModule],
})
export class FormComponent extends ClassMergeDirective {
	protected override defaultClass() {
		return 'bg-background p-12 rounded-lg';
	}
}
