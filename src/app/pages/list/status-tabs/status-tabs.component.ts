import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {PieceStatusType, PieceUtils} from '@entities/piece';
import {FetchPieceStatusesService} from '@features/piece/fetch-statuses';
import {TabComponent} from '@shared/components';

@Component({
	selector: 'app-status-tabs',
	templateUrl: './status-tabs.component.html',
	imports: [RouterLink, TabComponent],
})
export class StatusTabsComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	private readonly pieceUtils = inject(PieceUtils);

	readonly status = input<PieceStatusType>();
	readonly statuses = {
		data: this.fetchPieceStatuses.data,
		isLoading: this.fetchPieceStatuses.isLoading,
		hasError: this.fetchPieceStatuses.hasError,
	};

	ngOnInit() {
		this.fetchPieceStatuses
			.fetch()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	getStatusText(status: PieceStatusType) {
		return this.pieceUtils.statusToText(status);
	}
}
