import {
	Component,
	computed,
	effect,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Piece, PieceCardComponent, PieceSort} from '@entities/piece';
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
import {FetchPieceListService} from '@features/piece/fetchList';

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
export class PiecesPageComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly fetchAllPieces = inject(FetchAllPiecesService);
	private readonly fetchPieceList = inject(FetchPieceListService);

	readonly genre = signal<string | null | undefined>(undefined);
	readonly sort = signal<PieceSort>('created_at');
	readonly search = signal<string | null | undefined>(undefined);
	readonly page = signal<number>(0);

	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);
	readonly pieces = {
		data: this.fetchAllPieces.data.asReadonly(),
		page: this.fetchAllPieces.page.asReadonly(),
		totalCount: this.fetchAllPieces.totalCount.asReadonly(),
		totalPages: this.fetchAllPieces.totalPages.asReadonly(),
		isLoading: this.fetchAllPieces.isLoading.asReadonly(),
		hasError: this.fetchAllPieces.hasError.asReadonly(),
	};

	readonly searchValue = signal<string>('');
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly pieceToAddToList = signal<Piece | null>(null);

	get iconClasses() {
		return 'text-2xl text-primary absolute top-1/2 left-4 translate-y-[-50%]';
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			const genre = params.get('genre');
			const sort = (params.get('sort') as PieceSort | null) ?? 'created_at';
			const search = params.get('search');
			const page = params.get('page') ? Number(params.get('page')) : 0;

			this.genre.set(genre);
			this.sort.set(sort);
			this.search.set(search);
			this.page.set(page);
		});
	}

	constructor() {
		effect(() => {
			this.fetchAllPieces
				.fetch({
					genre: this.genre() ?? undefined,
					sort: this.sort(),
					search: this.search() ?? undefined,
					page: this.page(),
				})
				.subscribe();
		});
	}

	onSearch() {
		this.addQueryParams({search: this.searchValue(), page: null});
	}

	onSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchValue.set(value);
	}

	onSearchClear() {
		this.addQueryParams({search: null, page: null});
		this.searchValue.set('');
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	closeSortDropdown() {
		this.sortDropdownIsOpen.set(false);
	}

	onSortClick(sort: PieceSort | null) {
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
		this.fetchPieceList.clearCache();
		this.closeAddToListModal();
	}

	private addQueryParams(params: Params) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
