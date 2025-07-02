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
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {
	Piece,
	PieceListTableHeadComponent,
	PieceListTableRowComponent,
	PieceSort,
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

	onSortClick(sort: UserPieceSort | undefined) {
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
		const status = this.status();
		const sort = this.sort();
		const fetch =
			user && username === user.username
				? this.fetchPieceList.fetchByAuth({status, sort})
				: this.fetchPieceList.fetchByUsername(username, {status, sort});

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
