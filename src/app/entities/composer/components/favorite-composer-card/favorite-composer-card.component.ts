import {Component, computed, inject, input} from '@angular/core';
import {Composer} from '@entities/composer/composer.model';
import {ComposerUtils} from '@entities/composer/composer.utils';
import {TypographyComponent} from '@shared/components';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-favorite-composer-card',
	templateUrl: './favorite-composer-card.component.html',
	imports: [TypographyComponent],
})
export class FavoriteComposerCardComponent extends ClassMergeDirective {
	private readonly composerUtils = inject(ComposerUtils);

	readonly composer = input.required<Composer>();
	readonly fullName = computed(() =>
		this.composerUtils.getFullName(this.composer()),
	);
	readonly fullImagePath = computed(() => {
		const {image} = this.composer();
		return image ? `/server${image}` : null;
	});

	protected override defaultClass(): string {
		return 'block relative w-[80px] h-[115px] p-1';
	}
}
