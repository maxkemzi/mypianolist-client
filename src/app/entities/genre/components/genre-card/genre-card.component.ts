import {Component, computed, input} from '@angular/core';
import {TypographyComponent} from '@shared/components';
import {ClassMergeDirective} from '@shared/lib';
import {Genre} from '../../genre.model';

@Component({
	selector: 'app-genre-card',
	templateUrl: './genre-card.component.html',
	imports: [TypographyComponent],
})
export class GenreCardComponent extends ClassMergeDirective {
	readonly genre = input<Genre>({
		id: 'all',
		name: 'all',
		image: '/images/genres/all.jpg',
	});
	readonly imagePath = computed(() => `/server${this.genre().image}`);

	protected override defaultClass(): string {
		return 'relative h-[200px] flex items-center justify-center rounded-lg overflow-hidden';
	}
}
