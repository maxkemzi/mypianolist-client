import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PieceCardComponent} from '@entities/piece';
import {PaginationComponent} from '@features/pagination';
import {
	AddPieceToListButtonComponent,
	AddPieceToListFormComponent,
} from '@features/piece/addToList';
import {FetchAllPiecesService} from '@features/piece/fetchAll';
import {
	ContainerComponent,
	DropdownComponent,
	DropdownItemComponent,
	InputComponent,
	ModalContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {ButtonComponent} from '../../shared/components/button/button.component';

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
		PaginationComponent,
		AddPieceToListButtonComponent,
		AddPieceToListFormComponent,
		ModalContainerComponent,
	],
})
export class PiecesPageComponent {
	private readonly route = inject(ActivatedRoute);
	readonly fetchAllPieces = inject(FetchAllPiecesService);
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly searchQuery = signal<string>('');
	readonly genre = signal<string | null | undefined>(undefined);
	readonly addToListModalIsOpen = signal<boolean>(false);

	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);

	get iconClasses() {
		return 'text-2xl text-primary absolute top-1/2 left-4 translate-y-[-50%]';
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			const genre = params.get('genre');
			this.genre.set(genre);

			this.fetchAllPieces.fetch({genre: genre ?? undefined}).subscribe();
		});
	}

	handlePageChange(page: number) {
		this.fetchAllPieces.page.set(page);
		this.fetchAllPieces.fetch({genre: this.genre() ?? undefined}).subscribe();
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	handleSearch() {
		this.fetchAllPieces.page.set(1);
		this.fetchAllPieces
			.fetch({
				search: this.searchQuery().trim(),
				genre: this.genre() ?? undefined,
			})
			.subscribe();
	}

	handleInputSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchQuery.set(value);
	}

	handleClearSearch() {
		this.searchQuery.set('');
		this.handleSearch();
	}

	handleAddToListSubmit() {
		this.addToListModalIsOpen.set(false);
	}
}
