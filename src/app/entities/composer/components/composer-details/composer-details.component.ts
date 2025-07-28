import {Component, computed, inject, input} from '@angular/core';
import {CompleteComposer} from '@entities/composer/composer.model';
import {ComposerUtils} from '@entities/composer/composer.utils';
import {InfoItemComponent, TypographyComponent} from '@shared/components';
import {ComposerImageComponent} from '../composer-image/composer-image.component';

@Component({
	selector: 'app-composer-details',
	templateUrl: './composer-details.component.html',
	imports: [TypographyComponent, InfoItemComponent, ComposerImageComponent],
})
export class ComposerDetailsComponent {
	private readonly utils = inject(ComposerUtils);

	readonly composer = input.required<CompleteComposer>();

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
