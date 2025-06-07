import {Component, input, output} from '@angular/core';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	imports: [TypographyComponent],
})
export class PaginationComponent {
	page = input.required<number>();
	totalPages = input.required<number>();
	appPageChange = output<number>();

	get pages() {
		const pages: (number | string)[] = [];

		if (this.totalPages() <= 5) {
			for (let i = 0; i < this.totalPages(); i++) pages.push(i);
		} else {
			if (this.page() < 3) {
				pages.push(0, 1, 2, '...', this.totalPages() - 1);
			} else if (this.page() >= this.totalPages() - 3) {
				pages.push(
					0,
					'...',
					this.totalPages() - 3,
					this.totalPages() - 2,
					this.totalPages() - 1,
				);
			} else {
				pages.push(
					0,
					'...',
					this.page() - 1,
					this.page(),
					this.page() + 1,
					'...',
					this.totalPages() - 1,
				);
			}
		}

		return pages;
	}

	goToPage(page: number | string) {
		if (typeof page === 'number' && page !== this.page()) {
			this.appPageChange.emit(page);
		}
	}

	prevPage() {
		if (this.page() > 0) {
			this.appPageChange.emit(this.page() - 1);
		}
	}

	nextPage() {
		if (this.page() < this.totalPages() - 1) {
			this.appPageChange.emit(this.page() + 1);
		}
	}

	getPageLabel(page: number | string): string {
		return typeof page === 'number' ? String(page + 1) : page;
	}
}
