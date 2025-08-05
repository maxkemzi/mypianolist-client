import {Component, inject, input, signal} from '@angular/core';
import {UserPieceSort} from '@entities/piece';
import {DropdownItemComponent, SortDropdownComponent} from '@shared/components';
import {QueryParamsService} from '@shared/lib';

@Component({
	selector: 'app-list-sort-dropdown',
	templateUrl: './list-sort-dropdown.component.html',
	imports: [SortDropdownComponent, DropdownItemComponent],
})
export class ListSortDropdownComponent {
	private readonly queryParams = inject(QueryParamsService);

	readonly sort = input<UserPieceSort>();
	readonly menuIsOpen = signal<boolean>(false);

	onSortClick(sort: UserPieceSort | null) {
		this.menuIsOpen.set(false);
		this.queryParams.merge({sort});
	}
}
