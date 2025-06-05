import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PieceDetailsComponent} from '@entities/piece';
import {FetchPieceByIdService} from '@features/piece/fetchById';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-piece-page',
	templateUrl: './piece.component.html',
	imports: [ContainerComponent, TypographyComponent, PieceDetailsComponent],
})
export class PiecePageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly fetchPieceById = inject(FetchPieceByIdService);

	readonly piece = {
		data: this.fetchPieceById.data.asReadonly(),
	};

	ngOnInit() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter((id): id is string => !!id),
			)
			.subscribe(id => {
				this.fetchPieceById.fetch(id).subscribe();
			});
	}
}
