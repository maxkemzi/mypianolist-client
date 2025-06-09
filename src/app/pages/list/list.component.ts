import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Composer, ComposerUtils} from '@entities/composer';
import {PieceStatusType, PieceUtils} from '@entities/piece';
import {FetchPieceListService} from '@features/piece/fetchList';
import {FetchPieceStatusesService} from '@features/piece/fetchStatuses';
import {
	ContainerComponent,
	TabComponent,
	TypographyComponent,
} from '@shared/components';
import {ThemeUtils} from '@shared/theme';

@Component({
	selector: 'app-list-page',
	templateUrl: './list.component.html',
	imports: [TypographyComponent, TabComponent, ContainerComponent, RouterLink],
})
export class ListPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly fetchPieceList = inject(FetchPieceListService);
	private readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	private readonly pieceUtils = inject(PieceUtils);
	private readonly themeUtils = inject(ThemeUtils);
	private readonly composerUtils = inject(ComposerUtils);

	readonly pieceList = {
		data: this.fetchPieceList.data.asReadonly(),
		page: this.fetchPieceList.page.asReadonly(),
		totalCount: this.fetchPieceList.totalCount.asReadonly(),
		totalPages: this.fetchPieceList.totalPages.asReadonly(),
		isLoading: this.fetchPieceList.isLoading.asReadonly(),
		hasError: this.fetchPieceList.hasError.asReadonly(),
	};
	readonly pieceStatuses = {
		data: this.fetchPieceStatuses.data.asReadonly(),
	};
	readonly activeStatus = signal<PieceStatusType | null | undefined>(
		undefined,
	);

	ngOnInit() {
		this.route.queryParamMap.subscribe(params => {
			const status = params.get('status');
			this.activeStatus.set(status as PieceStatusType);
		});
		this.fetchPieceStatuses.fetch().subscribe();
	}

	constructor() {
		effect(() => {
			this.fetchPieceList
				.fetch({
					status: (this.activeStatus() as PieceStatusType) ?? undefined,
				})
				.subscribe();
		});
	}

	getStatusText(status: PieceStatusType) {
		return this.pieceUtils.statusToText(status);
	}

	getStatusBgColorClass(status: PieceStatusType) {
		return this.themeUtils.colorToBgClass(
			this.pieceUtils.statusToColor(status),
		);
	}

	getComposerName(composer: Composer) {
		return this.composerUtils.getCompactName(composer);
	}
}
