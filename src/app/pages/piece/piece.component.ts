import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PieceDetailsComponent, PieceService} from '@entities/piece';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-piece-page',
	templateUrl: './piece.component.html',
	imports: [ContainerComponent, TypographyComponent, PieceDetailsComponent],
})
export class PiecePageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	readonly piece = inject(PieceService);

	ngOnInit() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter((id): id is string => !!id),
			)
			.subscribe(id => {
				this.piece.fetchById(id).subscribe();
			});
	}
}
