import {Component, inject, signal} from '@angular/core';
import {PieceCardComponent, PieceService} from '@entities/piece';
import {
	ContainerComponent,
	DropdownComponent,
	DropdownItemComponent,
	InputComponent,
	TypographyComponent,
} from '@shared/components';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {FormsModule} from '@angular/forms';
import {ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces.component.html',
	imports: [
		ContainerComponent,
		PieceCardComponent,
		TypographyComponent,
		DropdownComponent,
		DropdownItemComponent,
		InputComponent,
		ButtonComponent,
		FormsModule,
		ClickOutsideDirective,
	],
})
export class PiecesPageComponent {
	readonly pieces = inject(PieceService);
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly searchQuery = signal<string | undefined>(undefined);

	ngOnInit(): void {
		this.pieces.fetchAll().subscribe();
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	handleSearch() {
		this.pieces.fetchAll({search: this.searchQuery()}).subscribe();
	}

	handleSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchQuery.set(value);
	}

	handleClickOutside() {
		if (this.sortDropdownIsOpen()) {
			this.sortDropdownIsOpen.set(false);
		}
	}
}
