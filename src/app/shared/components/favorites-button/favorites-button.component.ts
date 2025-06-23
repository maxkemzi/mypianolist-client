import {Component, input, output} from '@angular/core';
import {ButtonComponent} from '../button';

@Component({
	selector: 'app-favorites-button',
	templateUrl: './favorites-button.component.html',
	imports: [ButtonComponent],
})
export class FavoritesButtonComponent {
	readonly inFavorites = input.required<boolean>();
	readonly appAddToFavorites = output<void>();
	readonly appRemoveFromFavorites = output<void>();

	onClick() {
		if (this.inFavorites()) {
			this.appRemoveFromFavorites.emit();
		} else {
			this.appAddToFavorites.emit();
		}
	}

	get text() {
		return this.inFavorites() ? 'Remove from Favorites' : 'Add to Favorites';
	}
}
