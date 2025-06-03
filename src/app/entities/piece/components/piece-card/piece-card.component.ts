import {booleanAttribute, Component, computed, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CompletePiece} from '@entities/piece/piece.model';
import {TypographyComponent} from '@shared/components';
import {ClassMergeDirective} from '@shared/lib';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'app-piece-card',
	templateUrl: './piece-card.component.html',
	imports: [TypographyComponent, RouterLink],
})
export class PieceCardComponent extends ClassMergeDirective {
	readonly piece = input.required<CompletePiece>();
	readonly hideGenre = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly isEven = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	readonly composerImage = computed(() => {
		const {image} = this.piece().composer;
		return image ? `/server${image}` : null;
	});
	readonly composerName = computed(() => {
		const {nickname, firstName, lastName} = this.piece().composer;
		return nickname ?? `${firstName.charAt(0)}. ${lastName}`;
	});

	protected override defaultClass(): string {
		return twJoin(
			'flex p-4 gap-4',
			this.isEven() ? 'bg-surface' : 'bg-background',
		);
	}
}
