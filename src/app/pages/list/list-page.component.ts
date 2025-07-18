import {
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
	input,
	OnInit,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {
	Piece,
	PieceListTableHeadComponent,
	PieceListTableRowComponent,
	PieceStatusType,
	PieceUtils,
	UserPiece,
	UserPieceSort,
} from '@entities/piece';
import {AuthService} from '@features/auth';
import {AddPieceToListFormComponent} from '@features/piece/add-to-list';
import {
	EditPieceButtonComponent,
	EditPieceFormComponent,
} from '@features/piece/edit';
import {FetchPieceListService} from '@features/piece/fetch-list';
import {FetchPieceStatusesService} from '@features/piece/fetch-statuses';
import {
	RemovePieceFromListAlertComponent,
	RemovePieceFromListButtonComponent,
} from '@features/piece/remove-from-list';
import {
	ContainerComponent,
	DropdownItemComponent,
	InputComponent,
	ModalContainerComponent,
	SortDropdownComponent,
	TabComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-list-page',
	templateUrl: './list-page.component.html',
	imports: [
		TypographyComponent,
		TabComponent,
		ContainerComponent,
		RouterLink,
		RemovePieceFromListButtonComponent,
		RemovePieceFromListAlertComponent,
		ModalContainerComponent,
		ClickOutsideDirective,
		EditPieceButtonComponent,
		EditPieceFormComponent,
		PieceListTableRowComponent,
		PieceListTableHeadComponent,
		AddPieceToListFormComponent,
		SortDropdownComponent,
		DropdownItemComponent,
		InputComponent,
		FormsModule,
	],
})
export class ListPageComponent implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly fetchPieceList = inject(FetchPieceListService);
	private readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	private readonly pieceUtils = inject(PieceUtils);
	private readonly destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	readonly username = input.required<string>();
	readonly status = input<PieceStatusType>();
	readonly sort = input<UserPieceSort>();
	readonly search = input<string>();
	readonly isAuth = computed(() => this.auth.user() !== null);
	readonly pieceToRemove = signal<Piece | null>(null);
	readonly pieceToEdit = signal<UserPiece | null>(null);
	readonly pieceToAdd = signal<Piece | null>(null);
	readonly pieceList = {
		data: this.fetchPieceList.data,
		page: this.fetchPieceList.page,
		totalCount: this.fetchPieceList.totalCount,
		totalPages: this.fetchPieceList.totalPages,
		isLoading: this.fetchPieceList.isLoading,
		hasError: this.fetchPieceList.hasError,
	};
	readonly pieceStatuses = {
		data: this.fetchPieceStatuses.data,
		isLoading: this.fetchPieceStatuses.isLoading,
		hasError: this.fetchPieceStatuses.hasError,
	};
	readonly sortDropdownMenuIsOpen = signal<boolean>(false);
	readonly searchValue = signal<string>('');

	ngOnInit() {
		this.fetchPieceStatuses
			.fetch()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	constructor() {
		effect(() => {
			this.fetchList();
		});
	}

	getStatusText(status: PieceStatusType) {
		return this.pieceUtils.statusToText(status);
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

	onSortClick(sort: UserPieceSort | null) {
		this.addQueryParams({sort});
		this.sortDropdownMenuIsOpen.set(false);
	}

	openRemovePieceAlert(piece: Piece) {
		this.pieceToRemove.set(piece);
	}

	closeRemovePieceAlert() {
		this.pieceToRemove.set(null);
	}

	onRemovePieceConfirm() {
		this.fetchList();
		this.closeRemovePieceAlert();
	}

	openEditPieceModal(piece: UserPiece) {
		this.pieceToEdit.set(piece);
	}

	closeEditPieceModal() {
		this.pieceToEdit.set(null);
	}

	onEditPieceSubmit() {
		this.fetchList();
		this.closeEditPieceModal();
	}

	openAddPieceModal(piece: Piece) {
		this.pieceToAdd.set(piece);
	}

	closeAddPieceModal() {
		this.pieceToAdd.set(null);
	}

	onAddPieceSubmit() {
		this.fetchList();
		this.closeAddPieceModal();
	}

	private fetchList() {
		const user = this.auth.user();
		const username = this.username();
		const params = {
			status: this.status(),
			sort: this.sort(),
			search: this.search(),
		};

		const fetch =
			user && username === user.username
				? this.fetchPieceList.fetchByAuth(params)
				: this.fetchPieceList.fetchByUsername(username, params);

		fetch.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	private addQueryParams(params: Params) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
