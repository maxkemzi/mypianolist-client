import {Component, HostBinding, model} from '@angular/core';
import {ClickOutsideDirective} from '@shared/lib';
import {DropdownButtonComponent} from '../dropdown-button';
import {DropdownMenuComponent} from '../dropdown-menu';

@Component({
	selector: 'app-sort-dropdown',
	templateUrl: './sort-dropdown.component.html',
	imports: [
		DropdownMenuComponent,
		ClickOutsideDirective,
		DropdownButtonComponent,
	],
})
export class SortDropdownComponent {
	readonly menuIsOpen = model<boolean>(false);

	@HostBinding('class')
	get classes() {
		return 'relative block';
	}

	openMenu() {
		this.menuIsOpen.set(true);
	}

	closeMenu() {
		this.menuIsOpen.set(false);
	}
}
