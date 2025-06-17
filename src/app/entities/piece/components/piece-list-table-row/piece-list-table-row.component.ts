import {Component, computed, HostBinding, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ComposerUtils} from '@entities/composer';
import {UserPiece} from '@entities/piece/piece.model';
import {PieceUtils} from '@entities/piece/piece.utils';
import {TypographyComponent} from '@shared/components';
import {ThemeUtils} from '@shared/theme';

@Component({
	selector: 'tr[appPieceListTableRow]',
	templateUrl: './piece-list-table-row.component.html',
	imports: [RouterLink, TypographyComponent],
})
export class PieceListTableRowComponent {
	private readonly themeUtils = inject(ThemeUtils);
	private readonly pieceUtils = inject(PieceUtils);
	private readonly composerUtils = inject(ComposerUtils);

	readonly number = input.required<number>();
	readonly piece = input.required<UserPiece>();

	readonly statusBgColorClass = computed(() =>
		this.themeUtils.colorToBgClass(
			this.pieceUtils.statusToColor(this.piece().status),
		),
	);
	readonly composerName = computed(() =>
		this.composerUtils.getCompactName(this.piece().composer),
	);

	@HostBinding('class')
	get classes() {
		return 'even:bg-surface capitalize *:text-left *:not-first:p-4';
	}
}
