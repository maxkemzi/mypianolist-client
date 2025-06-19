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
import {AddPieceToListFormComponent} from '@features/piece/addToList';
import {FetchAllPiecesService} from '@features/piece/fetchAll';
import {FetchPieceListService} from '@features/piece/fetchList';
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
		AddPieceToListFormComponent,
		ModalContainerComponent,
		AddPieceToListButtonComponent,
	],
})
export class PiecesPageComponent {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly fetchAllPieces = inject(FetchAllPiecesService);
	private readonly fetchPieceList = inject(FetchPieceListService);
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
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly pieceToAddToList = signal<Piece | null>(null);

	get iconClasses() {
		return 'text-2xl text-primary absolute top-1/2 left-4 translate-y-[-50%]';
	}

	constructor() {
		effect(() => {
			this.fetch();
		});
	}

	onSearch() {
		if (this.searchValue().length !== 0) {
			this.addQueryParams({search: this.searchValue(), page: undefined});
		}
	}

	onSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchValue.set(value.trim());
	}

	onSearchClear() {
		this.addQueryParams({search: undefined, page: undefined});
		this.searchValue.set('');
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	closeSortDropdown() {
		this.sortDropdownIsOpen.set(false);
	}

	onSortClick(sort: PieceSort | undefined) {
		this.addQueryParams({sort});
		this.sortDropdownIsOpen.set(false);
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
