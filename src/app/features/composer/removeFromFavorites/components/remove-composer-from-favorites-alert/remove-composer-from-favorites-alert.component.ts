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
import {Composer, ComposerUtils} from '@entities/composer';
import {
	ButtonComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {RemoveComposerFromFavoritesService} from '../../remove-composer-from-favorites.service';

@Component({
	selector: 'app-remove-composer-from-favorites-alert',
	templateUrl: './remove-composer-from-favorites-alert.component.html',
	imports: [
		ModalComponent,
		ReactiveFormsModule,
		ButtonComponent,
		TypographyComponent,
	],
})
export class RemoveComposerFromFavoritesAlertComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(RemoveComposerFromFavoritesService);
	private readonly composerUtils = inject(ComposerUtils);

	readonly composer = input.required<Composer>();
	readonly appCancel = output<void>();
	readonly appConfirm = output<void>();

	readonly composerName = computed(() =>
		this.composerUtils.getFullName(this.composer()),
	);

	readonly isLoading = this.service.isLoading;

	onCancel() {
		this.appCancel.emit();
	}

	onConfirm() {
		this.service
			.remove(this.composer().id)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appConfirm.emit();
			});
	}
}
