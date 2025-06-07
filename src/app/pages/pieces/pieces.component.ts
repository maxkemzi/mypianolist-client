import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PieceCardComponent, PieceSort} from '@entities/piece';
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
		RouterLink,
	],
})
export class PiecesPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly fetchAllPieces = inject(FetchAllPiecesService);

	readonly genre = signal<string | undefined>(undefined);
	readonly sort = signal<PieceSort | undefined>(undefined);
	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);
	readonly pieces = {
		data: this.fetchAllPieces.data.asReadonly(),
		page: this.fetchAllPieces.page.asReadonly(),
		totalCount: this.fetchAllPieces.totalCount.asReadonly(),
		totalPages: this.fetchAllPieces.totalPages.asReadonly(),
		isLoading: this.fetchAllPieces.isLoading.asReadonly(),
		hasError: this.fetchAllPieces.hasError.asReadonly(),
	};
	readonly searchQuery = signal<string>('');
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly addToListModalIsOpen = signal<boolean>(false);

	get iconClasses() {
		return 'text-2xl text-primary absolute top-1/2 left-4 translate-y-[-50%]';
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			const genre = params.get('genre') ?? undefined;
			const sort = params.get('sort') as PieceSort | null;

			this.genre.set(genre);
			this.sort.set(sort || 'created_at');

			this.fetchAllPieces
				.fetch({genre: this.genre(), sort: this.sort()})
				.subscribe();
		});
	}

	onSearch() {
		this.fetchAllPieces.page.set(1);
		this.fetchAllPieces
			.fetch({
				search: this.searchQuery().trim(),
				genre: this.genre(),
				sort: this.sort(),
			})
			.subscribe();
	}

	onSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchQuery.set(value);
	}

	onSearchClear() {
		this.searchQuery.set('');
		this.onSearch();
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	closeSortDropdown() {
		this.sortDropdownIsOpen.set(false);
	}

	onSortClick() {
		this.sortDropdownIsOpen.set(false);
	}

	onPageChange(page: number) {
		this.fetchAllPieces.page.set(page);
		this.fetchAllPieces
			.fetch({genre: this.genre(), sort: this.sort()})
			.subscribe();
	}

	openAddToListModal() {
		this.addToListModalIsOpen.set(true);
	}

	closeAddToListModal() {
		this.addToListModalIsOpen.set(false);
	}
}
