import {Component, inject} from '@angular/core';
import {Piece, PieceCardComponent, PieceService} from '@entities/piece';
import {ContainerComponent} from '@shared/components';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces.component.html',
	imports: [ContainerComponent, PieceCardComponent],
})
export class PiecesPageComponent {
	private readonly pieceService = inject(PieceService);
	pieces: Piece[] = [];

	ngOnInit(): void {
		this.pieceService.fetchAll().subscribe(data => {
			this.pieces = data;
		});
	}
}
