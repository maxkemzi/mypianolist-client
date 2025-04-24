import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GenreService, GenreCardComponent, Genre} from '@entities/genre';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-catalog-page',
	templateUrl: './catalog.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		GenreCardComponent,
		RouterLink,
	],
})
export class CatalogPageComponent implements OnInit {
	private readonly genreService = inject(GenreService);
	genres: Genre[] = [];

	ngOnInit(): void {
		this.genreService.fetchAll().subscribe(data => {
			this.genres = data;
		});
	}

	get allGenre(): Genre {
		return {id: crypto.randomUUID(), name: 'all', image: '/all.jpg'};
	}
}
