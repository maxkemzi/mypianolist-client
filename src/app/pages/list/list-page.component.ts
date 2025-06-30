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
import {RouterLink} from '@angular/router';
import {
	Piece,
	PieceListTableHeadComponent,
	PieceListTableRowComponent,
	PieceStatusType,
	PieceUtils,
	UserPiece,
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
	ModalContainerComponent,
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
	],
})
export class ListPageComponent implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly fetchPieceList = inject(FetchPieceListService);
	private readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	private readonly pieceUtils = inject(PieceUtils);
	private readonly destroyRef = inject(DestroyRef);

	readonly username = input.required<string>();
	readonly status = input<PieceStatusType>();
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
		const fetch =
			user && username === user.username
				? this.fetchPieceList.fetchByAuth({status})
				: this.fetchPieceList.fetchByUsername(username, {status});

		fetch.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}
}
