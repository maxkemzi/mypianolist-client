import {Component, computed, input} from '@angular/core';
import {Genre} from '../../genre.model';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-genre-card',
	templateUrl: './genre-card.component.html',
	imports: [TypographyComponent],
})
export class GenreCardComponent {
	readonly genre = input<Genre>({
		id: 'all',
		name: 'all',
		image: '/images/genres/all.jpg',
	});
	readonly imagePath = computed(() => `/server${this.genre().image}`);
}
