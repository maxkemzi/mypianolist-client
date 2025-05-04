import {Component, computed, inject, signal} from '@angular/core';
import {PieceCardComponent, PiecesService} from '@entities/piece';
import {
	ContainerComponent,
	DropdownComponent,
	DropdownItemComponent,
	InputComponent,
	TypographyComponent,
} from '@shared/components';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {FormsModule} from '@angular/forms';
import {ClickOutsideDirective} from '@shared/lib';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-pieces-page',
	templateUrl: './pieces.component.html',
	imports: [
		ContainerComponent,
		PieceCardComponent,
		TypographyComponent,
		DropdownComponent,
		DropdownItemComponent,
		InputComponent,
		ButtonComponent,
		FormsModule,
		ClickOutsideDirective,
	],
})
export class PiecesPageComponent {
	private readonly route = inject(ActivatedRoute);
	readonly pieces = inject(PiecesService);
	readonly sortDropdownIsOpen = signal<boolean>(false);
	readonly searchQuery = signal<string>('');
	readonly genre = signal<string | null | undefined>(undefined);

	readonly title = computed(() => `${this.genre() ?? 'all'} pieces`);

	get iconClasses() {
		return 'text-2xl text-primary absolute top-1/2 left-4 translate-y-[-50%]';
	}

	ngOnInit(): void {
		this.route.queryParamMap.subscribe(params => {
			const genre = params.get('genre');
			this.genre.set(genre);

			this.pieces.fetchAll({genre: genre ?? undefined}).subscribe();
		});
	}

	toggleSortDropdownIsOpen() {
		this.sortDropdownIsOpen.update(value => !value);
	}

	handleSearch() {
		this.pieces
			.fetchAll({
				search: this.searchQuery().trim(),
				genre: this.genre() ?? undefined,
			})
			.subscribe();
	}

	handleInputSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchQuery.set(value);
	}

	handleClearSearch() {
		this.searchQuery.set('');
		this.handleSearch();
	}

	handleClickOutside() {
		if (this.sortDropdownIsOpen()) {
			this.sortDropdownIsOpen.set(false);
		}
	}
}
