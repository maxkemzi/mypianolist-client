import {Component, computed, inject, input} from '@angular/core';
import {Composer} from '@entities/composer/composer.model';
import {ComposerUtils} from '@entities/composer/composer.utils';
import {InfoItemComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-composer-details',
	templateUrl: './composer-details.component.html',
	imports: [TypographyComponent, InfoItemComponent],
})
export class ComposerDetailsComponent {
	private readonly utils = inject(ComposerUtils);

	readonly composer = input.required<Composer>();

	readonly image = computed(() => {
		const {image} = this.composer();
		return image ? `/server${image}` : null;
	});

	readonly fullName = computed(() => this.utils.getFullName(this.composer()));

	readonly lifeSpan = computed(() => {
		const {bornAt, diedAt} = this.composer();
		const bornDate = new Date(bornAt);
		const diedDate = diedAt ? new Date(diedAt) : null;

		if (!diedDate) {
			const diff = Date.now() - bornDate.getTime();
			const age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
			return `${bornDate.getFullYear()} (age ${age})`;
		}

		return `${bornDate.getFullYear()} - ${diedDate.getFullYear()}`;
	});
}
