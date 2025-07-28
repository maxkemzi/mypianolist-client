import {Component, computed, input, signal} from '@angular/core';
import {Piece} from '@entities/piece/piece.model';

@Component({
	selector: 'app-piece-image',
	templateUrl: './piece-image.component.html',
})
export class PieceImageComponent {
	readonly piece = input.required<Piece>();
	readonly width = input<string>();
	readonly height = input<string>();
	readonly color = input<'surface' | 'background'>('surface');

	readonly hasError = signal<boolean>(false);

	readonly src = computed(() => {
		const composerImage = this.piece().composer.image;
		const fallbackFilename =
			this.color() === 'background'
				? 'piece-fallback-background.svg'
				: 'piece-fallback-surface.svg';

		return composerImage && !this.hasError()
			? `/server${composerImage}`
			: `/images/${fallbackFilename}`;
	});

	onError() {
		this.hasError.set(true);
	}
}
