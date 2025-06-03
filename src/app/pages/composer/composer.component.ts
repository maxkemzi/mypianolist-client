import {Component, inject, OnInit} from '@angular/core';
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
	readonly fetchComposerById = inject(FetchComposerByIdService);

	ngOnInit() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter((id): id is string => !!id),
			)
			.subscribe(id => {
				this.fetchComposerById.fetch(id).subscribe();
			});
	}
}
