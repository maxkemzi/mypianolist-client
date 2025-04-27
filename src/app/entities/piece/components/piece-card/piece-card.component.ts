import {Component, computed, input} from '@angular/core';
import {Piece} from '@entities/piece/piece.model';
import {ButtonComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-piece-card',
	templateUrl: './piece-card.component.html',
	imports: [TypographyComponent, ButtonComponent],
})
export class PieceCardComponent {
	readonly piece = input.required<Piece>();
	readonly photoPath = computed(() => `/server${this.piece().composer.photo}`);
	readonly variant = input<'odd' | 'even'>('odd');
}
