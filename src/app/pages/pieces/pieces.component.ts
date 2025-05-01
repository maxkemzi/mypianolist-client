import {Component, computed, inject, signal} from '@angular/core';
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
import {ActivatedRoute} from '@angular/router';

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
	private readonly route = inject(ActivatedRoute);
	readonly pieces = inject(PieceService);
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly searchQuery = signal<string | undefined>(undefined);
	readonly genre = signal<string | undefined>(undefined);

	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			const genre = params.get('genre') ?? undefined;
			this.genre.set(genre);

			this.pieces.fetchAll({genre}).subscribe();
		});
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	handleSearch() {
		this.pieces
			.fetchAll({search: this.searchQuery(), genre: this.genre()})
			.subscribe();
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
