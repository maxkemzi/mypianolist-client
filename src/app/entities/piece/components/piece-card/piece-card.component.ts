import {
	booleanAttribute,
	Component,
	computed,
	inject,
	input,
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ComposerUtils} from '@entities/composer';
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
	private readonly composerUtils = inject(ComposerUtils);

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
	readonly composerName = computed(() =>
		this.composerUtils.getCompactName(this.piece().composer),
	);

	protected override defaultClass(): string {
		return twJoin(
			'flex p-4 gap-4',
			this.isEven() ? 'bg-surface' : 'bg-background',
		);
	}
}
