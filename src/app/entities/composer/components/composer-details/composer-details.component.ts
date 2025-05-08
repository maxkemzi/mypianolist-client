import {Component, computed, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Composer} from '@entities/composer/composer.model';
import {InfoItemComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-composer-details',
	templateUrl: './composer-details.component.html',
	imports: [TypographyComponent, RouterLink, InfoItemComponent],
})
export class ComposerDetailsComponent {
	readonly composer = input.required<Composer>();

	readonly fullName = computed(() => {
		const {nickname, firstName, lastName} = this.composer();
		let result = `${firstName} ${lastName}`;

		if (nickname) {
			result += ` (${nickname})`;
		}

		return result;
	});

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
