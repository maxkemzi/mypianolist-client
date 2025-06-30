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
import {AddComposerToFavoritesService} from '../../add-composer-to-favorites.service';

@Component({
	selector: 'app-add-composer-to-favorites-alert',
	templateUrl: './add-composer-to-favorites-alert.component.html',
	imports: [
		ModalComponent,
		ReactiveFormsModule,
		ButtonComponent,
		TypographyComponent,
	],
})
export class AddComposerToFavoritesAlertComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(AddComposerToFavoritesService);
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
			.add(this.composer().id)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appConfirm.emit();
			});
	}
}
