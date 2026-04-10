import {
	Component,
	DestroyRef,
	inject,
	input,
	OnInit,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	AddPieceToListButtonComponent,
	PieceDetailsComponent,
} from '@entities/piece';
import {AddPieceToFavoritesAlertComponent} from '@features/piece/add-to-favorites';
import {AddPieceToListFormComponent} from '@features/piece/add-to-list';
import {FetchPieceByIdService} from '@features/piece/fetch-by-id';
import {RemovePieceFromFavoritesAlertComponent} from '@features/piece/remove-from-favorites';
import {
	ContainerComponent,
	FavoritesButtonComponent,
	ModalContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-piece-page',
	templateUrl: './piece-page.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		PieceDetailsComponent,
		AddPieceToListFormComponent,
		AddPieceToFavoritesAlertComponent,
		RemovePieceFromFavoritesAlertComponent,
		ModalContainerComponent,
		ClickOutsideDirective,
		AddPieceToListButtonComponent,
		FavoritesButtonComponent,
	],
})
export class PiecePageComponent implements OnInit {
	private readonly fetchPieceById = inject(FetchPieceByIdService);
	private readonly destroyRef = inject(DestroyRef);

	readonly id = input.required<string>();
	readonly piece = {
		data: this.fetchPieceById.data,
		isLoading: this.fetchPieceById.isLoading,
		hasError: this.fetchPieceById.hasError,
	};
	readonly addToListModalIsOpen = signal<boolean>(false);
	readonly addToFavoritesAlertIsOpen = signal<boolean>(false);
	readonly removeFromFavoritesAlertIsOpen = signal<boolean>(false);

	ngOnInit() {
		this.fetch();
	}

	onAddToListSubmit() {
		this.closeAddToListModal();
	}

	openAddToListModal() {
		this.addToListModalIsOpen.set(true);
	}

	closeAddToListModal() {
		this.addToListModalIsOpen.set(false);
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
		this.fetchPieceById
			.fetch(this.id())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
