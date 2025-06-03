import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PieceStatus, PieceUtils} from '@entities/piece';
import {FetchPieceListService} from '@features/piece/fetchList';
import {FetchPieceStatusesService} from '@features/piece/fetchStatuses';
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
	readonly fetchPieceList = inject(FetchPieceListService);
	readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	readonly pieceUtils = inject(PieceUtils);

	activeStatus = signal<PieceStatus | null | undefined>(undefined);

	ngOnInit() {
		this.route.queryParamMap.subscribe(params => {
			const status = params.get('status');
			this.activeStatus.set(status as PieceStatus);
		});
		this.fetchPieceStatuses.fetch().subscribe();
	}

	constructor() {
		effect(() => {
			this.fetchPieceList
				.fetch({
					status: (this.activeStatus() as PieceStatus) ?? undefined,
				})
				.subscribe();
		});
	}
}
