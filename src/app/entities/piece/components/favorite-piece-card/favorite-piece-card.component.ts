import {Component, computed, input} from '@angular/core';
import {Piece} from '@entities/piece/piece.model';
import {TypographyComponent} from '@shared/components';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-favorite-piece-card',
	templateUrl: './favorite-piece-card.component.html',
	imports: [TypographyComponent],
})
export class FavoritePieceCardComponent extends ClassMergeDirective {
	readonly piece = input.required<Piece>();

	readonly fullComposerImagePath = computed(() => {
		const {image} = this.piece().composer;
		return image ? `/server${image}` : null;
	});

	protected override defaultClass(): string {
		return 'block relative w-[80px] h-[115px] p-1';
	}
}
