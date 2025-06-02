import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
	PieceListService,
	PieceStatus,
	PieceStatusesService,
	PiecesUtils,
} from '@entities/piece';
import {
	ContainerComponent,
	TabComponent,
	TypographyComponent,
} from '@shared/components';

@Component({
	selector: 'app-list-page',
	templateUrl: './list.component.html',
	imports: [TypographyComponent, TabComponent, ContainerComponent, RouterLink],
})
export class ListPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	readonly pieceList = inject(PieceListService);
	readonly pieceStatuses = inject(PieceStatusesService);
	readonly piecesUtils = inject(PiecesUtils);

	activeStatus = signal<PieceStatus | null | undefined>(undefined);

	ngOnInit() {
		this.route.queryParamMap.subscribe(params => {
			const status = params.get('status');
			this.activeStatus.set(status as PieceStatus);
		});
		this.pieceStatuses.fetchStatuses().subscribe();
	}

	constructor() {
		effect(() => {
			this.pieceList
				.fetch({status: (this.activeStatus() as PieceStatus) ?? undefined})
				.subscribe();
		});
	}
}
