import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
	private readonly fetchAllGenres = inject(FetchAllGenresService);
	private readonly destroyRef = inject(DestroyRef);

	readonly genres = {
		data: this.fetchAllGenres.data,
		isLoading: this.fetchAllGenres.isLoading,
		hasError: this.fetchAllGenres.hasError,
	};

	ngOnInit(): void {
		this.fetchAllGenres
			.fetch()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
