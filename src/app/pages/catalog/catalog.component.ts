import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GenreCardComponent, GenresService} from '@entities/genre';
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
	readonly genres = inject(GenresService);

	ngOnInit(): void {
		this.genres.fetchAll().subscribe();
	}
}
