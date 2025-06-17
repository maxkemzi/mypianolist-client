import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PieceDetailsComponent} from '@entities/piece';
import {FetchPieceByIdService} from '@features/piece/fetchById';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-piece-page',
	templateUrl: './piece.component.html',
	imports: [ContainerComponent, TypographyComponent, PieceDetailsComponent],
})
export class PiecePageComponent implements OnInit {
	private readonly fetchPieceById = inject(FetchPieceByIdService);
	private readonly destroyRef = inject(DestroyRef);

	readonly id = input.required<string>();
	readonly piece = {data: this.fetchPieceById.data};

	ngOnInit() {
		this.fetchPieceById
			.fetch(this.id())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
