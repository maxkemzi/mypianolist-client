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
import {
	Piece,
	PieceListTableHeadComponent,
	PieceListTableRowComponent,
	PieceStatusType,
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
import {
	RemovePieceFromListAlertComponent,
	RemovePieceFromListButtonComponent,
} from '@features/piece/remove-from-list';
import {
	ButtonComponent,
	ContainerComponent,
	ModalContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {ListSortDropdownComponent} from './list-sort-dropdown/list-sort-dropdown.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {StatusTabsComponent} from './status-tabs/status-tabs.component';

@Component({
	selector: 'app-list-page',
	templateUrl: './list-page.component.html',
	imports: [
		TypographyComponent,
		ContainerComponent,
		RemovePieceFromListButtonComponent,
		RemovePieceFromListAlertComponent,
		ModalContainerComponent,
		ClickOutsideDirective,
		EditPieceButtonComponent,
		EditPieceFormComponent,
		PieceListTableRowComponent,
		PieceListTableHeadComponent,
		AddPieceToListFormComponent,
		FormsModule,
		ButtonComponent,
		StatusTabsComponent,
		SearchBarComponent,
		ListSortDropdownComponent,
	],
})
export class ListPageComponent {
	private readonly auth = inject(AuthService);
	private readonly fetchPieceList = inject(FetchPieceListService);
	private readonly destroyRef = inject(DestroyRef);

	readonly username = input.required<string>();
	readonly status = input<PieceStatusType>();
	readonly sort = input<UserPieceSort>();
	readonly search = input<string>();

	readonly pieceToEdit = signal<UserPiece | null>(null);
	readonly pieceToRemove = signal<Piece | null>(null);
	readonly pieceToAdd = signal<Piece | null>(null);
	readonly list = {
		data: this.fetchPieceList.data,
		page: this.fetchPieceList.page,
		totalCount: this.fetchPieceList.totalCount,
		totalPages: this.fetchPieceList.totalPages,
		isLoading: this.fetchPieceList.isLoading,
		hasMore: this.fetchPieceList.hasMore,
		hasError: this.fetchPieceList.hasError,
	};

	readonly isAuth = computed(() => this.auth.user() !== null);
	readonly isMyOwnList = computed(() => {
		const user = this.auth.user();
		return user && this.username() === user.username;
	});

	constructor() {
		effect(() => {
			this.fetchFirstPage();
		});
	}

	openEditPieceModal(piece: UserPiece) {
		this.pieceToEdit.set(piece);
	}

	closeEditPieceModal() {
		this.pieceToEdit.set(null);
	}

	onEditPieceSubmit() {
		this.fetchFirstPage();
		this.closeEditPieceModal();
	}

	openRemovePieceAlert(piece: Piece) {
		this.pieceToRemove.set(piece);
	}

	closeRemovePieceAlert() {
		this.pieceToRemove.set(null);
	}

	onRemovePieceConfirm() {
		this.fetchFirstPage();
		this.closeRemovePieceAlert();
	}

	openAddPieceModal(piece: Piece) {
		this.pieceToAdd.set(piece);
	}

	closeAddPieceModal() {
		this.pieceToAdd.set(null);
	}

	onAddPieceSubmit() {
		this.fetchFirstPage();
		this.closeAddPieceModal();
	}

	onFetchMore() {
		this.fetchMore();
	}

	private fetchFirstPage() {
		const params = {
			status: this.status(),
			sort: this.sort(),
			search: this.search(),
			page: 0,
		};

		const fetch = this.isMyOwnList()
			? this.fetchPieceList.fetchByAuth(params)
			: this.fetchPieceList.fetchByUsername(this.username(), params);

		fetch.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	private fetchMore() {
		const params = {
			status: this.status(),
			sort: this.sort(),
			search: this.search(),
			page: this.list.page() + 1,
		};

		const fetch = this.isMyOwnList()
			? this.fetchPieceList.fetchMoreByAuth(params)
			: this.fetchPieceList.fetchMoreByUsername(this.username(), params);

		fetch.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}
}
