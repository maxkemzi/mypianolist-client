import {Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ComposerUtils} from '@entities/composer';
import {CompletePiece} from '@entities/piece/piece.model';
import {InfoItemComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-piece-details',
	templateUrl: './piece-details.component.html',
	imports: [TypographyComponent, RouterLink, InfoItemComponent],
})
export class PieceDetailsComponent {
	private readonly composerUtils = inject(ComposerUtils);

	readonly piece = input.required<CompletePiece>();

	readonly composedDate = computed(() => {
		return new Date(this.piece().composedAt).getFullYear().toString();
	});

	readonly composerImage = computed(() => {
		const {image} = this.piece().composer;
		return image ? `/server${image}` : null;
	});

	readonly composerName = computed(() =>
		this.composerUtils.getCompactName(this.piece().composer),
	);

	readonly composerLifeSpan = computed(() => {
		const {bornAt, diedAt} = this.piece().composer;
		const bornDate = new Date(bornAt);
		const diedDate = diedAt ? new Date(diedAt) : null;

		if (!diedDate) {
			const diff = Date.now() - bornDate.getTime();
			const age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
			return `${bornDate.getFullYear()} (age ${age})`;
		}

		return `${bornDate.getFullYear()} - ${diedDate.getFullYear()}`;
	});
}
