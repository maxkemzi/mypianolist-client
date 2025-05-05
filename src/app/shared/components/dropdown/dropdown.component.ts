import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
})
export class DropdownComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'block';
	}
}
