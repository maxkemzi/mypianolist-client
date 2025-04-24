import {Component, computed, input} from '@angular/core';
import {Genre} from '../../genre.api';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-genre-card',
	templateUrl: './genre-card.component.html',
	imports: [TypographyComponent],
})
export class GenreCardComponent {
	readonly genre = input.required<Genre>();
	readonly imagePath = computed(() => `/server/images${this.genre().image}`);
}
