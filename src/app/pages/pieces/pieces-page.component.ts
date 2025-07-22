import {
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
	input,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
	AddPieceToListButtonComponent,
	Piece,
	PieceCardComponent,
	PieceSort,
} from '@entities/piece';
import {PaginationComponent} from '@features/pagination';
import {AddPieceToListFormComponent} from '@features/piece/add-to-list';
import {FetchAllPiecesService} from '@features/piece/fetch-all';
import {
	ContainerComponent,
	DropdownItemComponent,
	InputComponent,
	ModalContainerComponent,
	SortDropdownComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {ButtonComponent} from '../../shared/components/button/button.component';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces-page.component.html',
	imports: [
		ContainerComponent,
		PieceCardComponent,
		TypographyComponent,
		DropdownItemComponent,
		InputComponent,
		ButtonComponent,
		FormsModule,
		ClickOutsideDirective,
		PaginationComponent,
		AddPieceToListFormComponent,
		ModalContainerComponent,
		AddPieceToListButtonComponent,
		SortDropdownComponent,
	],
})
export class PiecesPageComponent {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly fetchAllPieces = inject(FetchAllPiecesService);
	private readonly destroyRef = inject(DestroyRef);

	readonly pieces = {
		data: this.fetchAllPieces.data,
		page: this.fetchAllPieces.page,
		totalCount: this.fetchAllPieces.totalCount,
		totalPages: this.fetchAllPieces.totalPages,
		isLoading: this.fetchAllPieces.isLoading,
		hasError: this.fetchAllPieces.hasError,
	};

	readonly genre = input<string>();
	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);
	readonly sort = input<PieceSort>();
	readonly search = input<string>();
	readonly page = input<number>();

	readonly searchValue = signal<string>('');
	readonly sortDropdownMenuIsOpen = signal<boolean>(false);
	readonly pieceToAddToList = signal<Piece | null>(null);

	constructor() {
		effect(() => {
			this.fetch();
		});
	}

	onSearch() {
		if (this.searchValue().length !== 0) {
			this.addQueryParams({search: this.searchValue(), page: null});
		}
	}

	onSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchValue.set(value.trim());
	}

	onSearchClear() {
		this.addQueryParams({search: null, page: null});
		this.searchValue.set('');
	}

	onSortClick(sort: PieceSort | null) {
		this.addQueryParams({sort});
		this.sortDropdownMenuIsOpen.set(false);
	}

	onPageChange(page: number) {
		this.addQueryParams({page});
	}

	openAddToListModal(piece: Piece) {
		this.pieceToAddToList.set(piece);
	}

	closeAddToListModal() {
		this.pieceToAddToList.set(null);
	}

	onAddToListSubmit() {
		this.fetch();
		this.closeAddToListModal();
	}

	private fetch() {
		this.fetchAllPieces
			.fetch({
				genre: this.genre(),
				sort: this.sort(),
				search: this.search(),
				page: this.page(),
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	private addQueryParams(params: Params) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
