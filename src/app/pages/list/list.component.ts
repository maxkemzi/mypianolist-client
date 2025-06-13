import {
	Component,
	DestroyRef,
	effect,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Composer, ComposerUtils} from '@entities/composer';
import {Piece, PieceStatusType, PieceUtils, UserPiece} from '@entities/piece';
import {FetchPieceListService} from '@features/piece/fetchList';
import {FetchPieceStatusesService} from '@features/piece/fetchStatuses';
import {
	RemovePieceFromListAlertComponent,
	RemovePieceFromListButtonComponent,
} from '@features/piece/removeFromList';
import {
	ContainerComponent,
	ModalContainerComponent,
	TabComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {ThemeUtils} from '@shared/theme';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	EditPieceButtonComponent,
	EditPieceFormComponent,
} from '@features/piece/edit';

@Component({
	selector: 'app-list-page',
	templateUrl: './list.component.html',
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
	],
})
export class ListPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly fetchPieceList = inject(FetchPieceListService);
	private readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	private readonly pieceUtils = inject(PieceUtils);
	private readonly themeUtils = inject(ThemeUtils);
	private readonly composerUtils = inject(ComposerUtils);
	private readonly destroyRef = inject(DestroyRef);

	readonly pieceList = {
		data: this.fetchPieceList.data.asReadonly(),
		page: this.fetchPieceList.page.asReadonly(),
		totalCount: this.fetchPieceList.totalCount.asReadonly(),
		totalPages: this.fetchPieceList.totalPages.asReadonly(),
		isLoading: this.fetchPieceList.isLoading.asReadonly(),
		hasError: this.fetchPieceList.hasError.asReadonly(),
	};
	readonly pieceStatuses = {
		data: this.fetchPieceStatuses.data.asReadonly(),
		isLoading: this.fetchPieceStatuses.isLoading.asReadonly(),
		hasError: this.fetchPieceStatuses.hasError.asReadonly(),
	};

	readonly status = signal<PieceStatusType | null | undefined>(undefined);
	readonly pieceToRemoveFromList = signal<Piece | null>(null);
	readonly pieceToEdit = signal<UserPiece | null>(null);

	ngOnInit() {
		this.fetchPieceStatuses
			.fetch()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
		this.route.queryParamMap
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(params => {
				const status = params.get('status') as PieceStatusType | null;

				this.status.set(status);
			});
	}

	constructor() {
		effect(() => {
			this.fetchList();
		});
	}

	getStatusText(status: PieceStatusType) {
		return this.pieceUtils.statusToText(status);
	}

	getStatusBgColorClass(status: PieceStatusType) {
		return this.themeUtils.colorToBgClass(
			this.pieceUtils.statusToColor(status),
		);
	}

	getComposerName(composer: Composer) {
		return this.composerUtils.getCompactName(composer);
	}

	openRemovePieceFromListAlert(piece: Piece) {
		this.pieceToRemoveFromList.set(piece);
	}

	closeRemovePieceFromListAlert() {
		this.pieceToRemoveFromList.set(null);
	}

	onRemoveFromListConfirm() {
		this.fetchPieceList.clearCache();
		this.fetchList();
		this.closeRemovePieceFromListAlert();
	}

	openEditPieceModal(piece: UserPiece) {
		this.pieceToEdit.set(piece);
	}

	closeEditPieceModal() {
		this.pieceToEdit.set(null);
	}

	onEditSubmit() {
		this.fetchPieceList.clearCache();
		this.fetchList();
		this.closeEditPieceModal();
	}

	private fetchList() {
		this.fetchPieceList
			.fetch({status: this.status() ?? undefined})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
