import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'block';
	}
}
