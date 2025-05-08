import {Component, computed, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Piece} from '@entities/piece/piece.model';
import {InfoItemComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-piece-details',
	templateUrl: './piece-details.component.html',
	imports: [TypographyComponent, RouterLink, InfoItemComponent],
})
export class PieceDetailsComponent {
	readonly piece = input.required<Piece>();

	readonly composedDate = computed(() => {
		return new Date(this.piece().composedAt).getFullYear().toString();
	});

	readonly composerName = computed(() => {
		const {nickname, firstName, lastName} = this.piece().composer;
		return nickname ?? `${firstName.charAt(0)}. ${lastName}`;
	});

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
