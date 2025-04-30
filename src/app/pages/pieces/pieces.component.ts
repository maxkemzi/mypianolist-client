import {Component, inject, signal} from '@angular/core';
import {PieceCardComponent, PieceService} from '@entities/piece';
import {
	ContainerComponent,
	DropdownComponent,
	DropdownItemComponent,
	TypographyComponent,
} from '@shared/components';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces.component.html',
	imports: [
		ContainerComponent,
		PieceCardComponent,
		TypographyComponent,
		DropdownComponent,
		DropdownItemComponent,
	],
})
export class PiecesPageComponent {
	readonly pieces = inject(PieceService);
	readonly sortDropdownIsOpen = signal<boolean>(false);

	ngOnInit(): void {
		this.pieces.fetchAll().subscribe();
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}
}
