import {
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ReactiveFormsModule} from '@angular/forms';
import {ComposerUtils} from '@entities/composer';
import {Piece} from '@entities/piece';
import {
	ButtonComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {AddPieceToFavoritesService} from '../../add-piece-to-favorites.service';

@Component({
	selector: 'app-add-piece-to-favorites-alert',
	templateUrl: './add-piece-to-favorites-alert.component.html',
	imports: [
		ModalComponent,
		ReactiveFormsModule,
		ButtonComponent,
		TypographyComponent,
	],
})
export class AddPieceToFavoritesAlertComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(AddPieceToFavoritesService);
	private readonly composerUtils = inject(ComposerUtils);

	readonly piece = input.required<Piece>();
	readonly appCancel = output<void>();
	readonly appConfirm = output<void>();

	readonly composerName = computed(() =>
		this.composerUtils.getCompactName(this.piece().composer),
	);

	readonly isLoading = this.service.isLoading;

	onCancel() {
		this.appCancel.emit();
	}

	onConfirm() {
		this.service
			.add(this.piece().id)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appConfirm.emit();
			});
	}
}
