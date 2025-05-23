import {Component, inject, OnInit, signal} from '@angular/core';
import {PieceStatus, PieceStatusesService, PiecesUtils} from '@entities/piece';
import {TabComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-list-page',
	templateUrl: './list.component.html',
	imports: [TypographyComponent, TabComponent],
})
export class ListPageComponent implements OnInit {
	readonly pieceStatuses = inject(PieceStatusesService);
	readonly piecesUtils = inject(PiecesUtils);

	activeStatus = signal<'all_pieces' | PieceStatus>('all_pieces');

	ngOnInit() {
		this.pieceStatuses.fetchStatuses().subscribe();
	}

	handleTabClick(status: 'all_pieces' | PieceStatus) {
		this.activeStatus.set(status);
	}
}
