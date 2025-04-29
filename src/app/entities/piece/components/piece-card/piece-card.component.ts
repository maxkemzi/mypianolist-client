import {booleanAttribute, Component, computed, input} from '@angular/core';
import {Piece} from '@entities/piece/piece.model';
import {ButtonComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-piece-card',
	templateUrl: './piece-card.component.html',
	imports: [TypographyComponent, ButtonComponent],
})
export class PieceCardComponent {
	readonly piece = input.required<Piece>();
	readonly hideGenre = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
	readonly variant = input<'odd' | 'even'>('odd');

	readonly photoPath = computed(() => `/server${this.piece().composer.photo}`);
	readonly composerName = computed(() => {
		const {nickname, firstName, lastName} = this.piece().composer;
		return nickname ?? `${firstName.charAt(0)}. ${lastName}`;
	});
}
