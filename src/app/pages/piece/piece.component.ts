import {Component, computed, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Piece, PieceService} from '@entities/piece';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-piece-page',
	templateUrl: './piece.component.html',
	imports: [ContainerComponent, TypographyComponent],
})
export class PiecePageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	readonly piece = inject(PieceService);

	readonly composedDate = computed(() => {
		const piece = this.piece.data();
		if (!piece) return '';

		return new Date(piece.composedAt).getFullYear();
	});

	readonly composerName = computed(() => {
		const piece = this.piece.data();
		if (!piece) return '';

		const {nickname, firstName, lastName} = piece.composer;
		return nickname ?? `${firstName.charAt(0)}. ${lastName}`;
	});

	readonly composerLifeSpan = computed(() => {
		const piece = this.piece.data();
		if (!piece) return '';

		const {bornAt, diedAt} = piece.composer;
		const bornDate = new Date(bornAt);
		const diedDate = diedAt ? new Date(diedAt) : null;

		if (!diedDate) {
			const diff = Date.now() - bornDate.getTime();
			const age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
			return `${bornDate.getFullYear()} (age ${age})`;
		}

		return `${bornDate.getFullYear()} - ${diedDate.getFullYear()}`;
	});

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
