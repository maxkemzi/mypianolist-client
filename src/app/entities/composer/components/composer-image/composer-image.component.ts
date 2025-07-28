import {Component, computed, inject, input, signal} from '@angular/core';
import {Composer} from '@entities/composer/composer.model';
import {ComposerUtils} from '@entities/composer/composer.utils';

@Component({
	selector: 'app-composer-image',
	templateUrl: './composer-image.component.html',
})
export class ComposerImageComponent {
	private readonly utils = inject(ComposerUtils);

	readonly composer = input.required<Composer>();
	readonly width = input<string>();
	readonly height = input<string>();

	readonly hasError = signal<boolean>(false);

	readonly src = computed(() => {
		const {image} = this.composer();

		return image && !this.hasError()
			? `/server${image}`
			: `/images/composer-fallback.svg`;
	});

	onError() {
		this.hasError.set(true);
	}

	get alt() {
		return this.utils.getFullName(this.composer());
	}
}
