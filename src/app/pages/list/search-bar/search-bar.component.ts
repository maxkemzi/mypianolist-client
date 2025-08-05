import {Component, inject, input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputComponent, TypographyComponent} from '@shared/components';
import {QueryParamsService} from '@shared/lib';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	imports: [InputComponent, TypographyComponent, FormsModule],
})
export class SearchBarComponent {
	private readonly queryParams = inject(QueryParamsService);

	readonly isDisabled = input<boolean>(false);
	readonly searchValue = signal<string>('');

	onSearch() {
		if (this.searchValue().length !== 0) {
			this.queryParams.merge({search: this.searchValue()});
		}
	}

	onSearchInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchValue.set(value.trim());
	}

	onSearchClear() {
		this.searchValue.set('');
		this.queryParams.merge({search: null});
	}
}
