import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {ComposerDetailsComponent} from '@entities/composer';
import {FetchComposerByIdService} from '@features/composer/fetchById';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-composer-page',
	templateUrl: './composer.component.html',
	imports: [ContainerComponent, TypographyComponent, ComposerDetailsComponent],
})
export class ComposerPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly fetchComposerById = inject(FetchComposerByIdService);
	private readonly destroyRef = inject(DestroyRef);

	readonly composer = {data: this.fetchComposerById.data.asReadonly()};

	ngOnInit() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter((id): id is string => !!id),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(id => {
				this.fetchComposerById
					.fetch(id)
					.pipe(takeUntilDestroyed(this.destroyRef))
					.subscribe();
			});
	}
}
