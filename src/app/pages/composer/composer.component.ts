import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComposerDetailsComponent, ComposerService} from '@entities/composer';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-composer-page',
	templateUrl: './composer.component.html',
	imports: [ContainerComponent, TypographyComponent, ComposerDetailsComponent],
})
export class ComposerPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	readonly composer = inject(ComposerService);

	ngOnInit() {
		this.route.paramMap
			.pipe(
				map(params => params.get('id')),
				filter((id): id is string => !!id),
			)
			.subscribe(id => {
				this.composer.fetchById(id).subscribe();
			});
	}
}
