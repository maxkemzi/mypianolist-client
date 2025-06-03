import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GenreCardComponent} from '@entities/genre';
import {FetchAllGenresService} from '@features/genre/fetchAll';
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
	readonly fetchAllGenres = inject(FetchAllGenresService);

	ngOnInit(): void {
		this.fetchAllGenres.fetch().subscribe();
	}
}
