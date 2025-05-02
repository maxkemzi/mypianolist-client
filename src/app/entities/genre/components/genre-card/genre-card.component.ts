import {Component, computed, HostBinding, input} from '@angular/core';
import {TypographyComponent} from '@shared/components';
import {Genre} from '../../genre.model';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-genre-card',
	templateUrl: './genre-card.component.html',
	imports: [TypographyComponent],
})
export class GenreCardComponent {
	readonly class = input<string>();
	readonly genre = input<Genre>({
		id: 'all',
		name: 'all',
		image: '/images/genres/all.jpg',
	});
	readonly imagePath = computed(() => `/server${this.genre().image}`);

	@HostBinding('class')
	get classes() {
		return twMerge('block', this.class());
	}
}
