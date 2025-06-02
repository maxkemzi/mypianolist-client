import {
	booleanAttribute,
	Component,
	inject,
	input,
	signal,
} from '@angular/core';
import {PieceListService} from '@entities/piece';
import {ButtonComponent} from '@shared/components';
import {catchError, finalize, of} from 'rxjs';

@Component({
	selector: 'app-add-to-list-button',
	templateUrl: './add-to-list-button.component.html',
	imports: [ButtonComponent],
})
export class AddToListButtonComponent {
	private readonly pieceList = inject(PieceListService);

	pieceId = input.required<string>();
	isDisabled = input<boolean, unknown>(false, {transform: booleanAttribute});

	isLoading = signal<boolean>(false);
	hasError = signal<boolean>(false);

	handleClick() {
		this.isLoading.set(true);
		this.hasError.set(false);
		this.pieceList
			.add(this.pieceId())
			.pipe(
				catchError(() => {
					this.hasError.set(true);
					return of(null);
				}),
				finalize(() => {
					this.isLoading.set(false);
				}),
			)
			.subscribe(() => {
				console.log('added piece to list');
			});
	}
}
