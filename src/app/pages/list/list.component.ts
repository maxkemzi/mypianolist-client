import {Component, inject, OnInit, signal} from '@angular/core';
import {PiecesService, PieceStatus, PiecesUtils} from '@entities/piece';
import {TabComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-list-page',
	templateUrl: './list.component.html',
	imports: [TypographyComponent, TabComponent],
})
export class ListPageComponent implements OnInit {
	private pieces = inject(PiecesService);
	piecesUtils = inject(PiecesUtils);
	statuses = signal<PieceStatus[]>([]);
	activeStatus = signal<'all_pieces' | PieceStatus>('all_pieces');

	ngOnInit() {
		this.pieces.fetchStatuses().subscribe(data => {
			this.statuses.set(data);
		});
	}

	handleTabClick(status: 'all_pieces' | PieceStatus) {
		this.activeStatus.set(status);
	}
}
