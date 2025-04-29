import {Component, inject} from '@angular/core';
import {PieceCardComponent, PieceService} from '@entities/piece';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces.component.html',
	imports: [ContainerComponent, PieceCardComponent, TypographyComponent],
})
export class PiecesPageComponent {
	readonly pieces = inject(PieceService);

	ngOnInit(): void {
		this.pieces.fetchAll().subscribe();
	}
}
