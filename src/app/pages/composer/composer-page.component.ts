import {
	Component,
	DestroyRef,
	inject,
	input,
	OnInit,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ComposerDetailsComponent} from '@entities/composer';
import {AddComposerToFavoritesAlertComponent} from '@features/composer/add-to-favorites';
import {FetchComposerByIdService} from '@features/composer/fetch-by-id';
import {RemoveComposerFromFavoritesAlertComponent} from '@features/composer/remove-from-favorites';
import {
	ContainerComponent,
	FavoritesButtonComponent,
	ModalContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-composer-page',
	templateUrl: './composer-page.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		ComposerDetailsComponent,
		AddComposerToFavoritesAlertComponent,
		ClickOutsideDirective,
		ModalContainerComponent,
		RemoveComposerFromFavoritesAlertComponent,
		FavoritesButtonComponent,
	],
})
export class ComposerPageComponent implements OnInit {
	private readonly fetchComposerById = inject(FetchComposerByIdService);
	private readonly destroyRef = inject(DestroyRef);

	readonly id = input.required<string>();
	readonly composer = {
		data: this.fetchComposerById.data,
		isLoading: this.fetchComposerById.isLoading,
		hasError: this.fetchComposerById.hasError,
	};
	readonly addToFavoritesAlertIsOpen = signal<boolean>(false);
	readonly removeFromFavoritesAlertIsOpen = signal<boolean>(false);

	ngOnInit() {
		this.fetch();
	}

	onAddToFavorites() {
		this.fetch();
		this.closeAddToFavoritesAlert();
	}

	openAddToFavoritesAlert() {
		this.addToFavoritesAlertIsOpen.set(true);
		document.body.classList.add('overflow-hidden');
	}

	closeAddToFavoritesAlert() {
		this.addToFavoritesAlertIsOpen.set(false);
		document.body.classList.remove('overflow-hidden');
	}

	onRemoveFromFavorites() {
		this.fetch();
		this.closeRemoveFromFavoritesAlert();
	}

	openRemoveFromFavoritesAlert() {
		this.removeFromFavoritesAlertIsOpen.set(true);
		document.body.classList.add('overflow-hidden');
	}

	closeRemoveFromFavoritesAlert() {
		this.removeFromFavoritesAlertIsOpen.set(false);
		document.body.classList.remove('overflow-hidden');
	}

	private fetch() {
		this.fetchComposerById
			.fetch(this.id())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
