import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ComposerDetailsComponent} from '@entities/composer';
import {FetchComposerByIdService} from '@features/composer/fetchById';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-composer-page',
	templateUrl: './composer.component.html',
	imports: [ContainerComponent, TypographyComponent, ComposerDetailsComponent],
})
export class ComposerPageComponent implements OnInit {
	private readonly fetchComposerById = inject(FetchComposerByIdService);
	private readonly destroyRef = inject(DestroyRef);

	readonly id = input.required<string>();
	readonly composer = {data: this.fetchComposerById.data};

	ngOnInit() {
		this.fetchComposerById
			.fetch(this.id())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
