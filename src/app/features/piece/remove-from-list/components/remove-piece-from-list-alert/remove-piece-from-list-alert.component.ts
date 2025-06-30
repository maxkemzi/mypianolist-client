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
import {AlertComponent, TypographyComponent} from '@shared/components';
import {RemovePieceFromListService} from '../../remove-piece-from-list.service';

@Component({
	selector: 'app-remove-piece-from-list-alert',
	templateUrl: './remove-piece-from-list-alert.component.html',
	imports: [ReactiveFormsModule, TypographyComponent, AlertComponent],
})
export class RemovePieceFromListAlertComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(RemovePieceFromListService);
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
			.remove(this.piece().id)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appConfirm.emit();
			});
	}
}
