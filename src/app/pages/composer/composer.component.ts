import {Component, computed, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComposerService} from '@entities/composer';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {filter, map} from 'rxjs';

@Component({
	selector: 'app-composer-page',
	templateUrl: './composer.component.html',
	imports: [ContainerComponent, TypographyComponent],
})
export class ComposerPageComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	readonly composer = inject(ComposerService);

	readonly fullName = computed(() => {
		const composer = this.composer.data();
		if (!composer) return '';

		const {nickname, firstName, lastName} = composer;
		let result = `${firstName} ${lastName}`;

		if (nickname) {
			result += ` (${nickname})`;
		}

		return result;
	});

	readonly lifeSpan = computed(() => {
		const composer = this.composer.data();
		if (!composer) return '';

		const {bornAt, diedAt} = composer;
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
				this.composer.fetchById(id).subscribe();
			});
	}
}
