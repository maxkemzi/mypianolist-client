import {Component, inject, input, output, signal} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {CompletePiece, PieceStatus, PieceUtils} from '@entities/piece';
import {FetchPieceStatusesService} from '@features/piece/fetchStatuses';
import {
	ButtonComponent,
	DropdownComponent,
	DropdownItemComponent,
	FormComponent,
	FormFieldComponent,
	InputComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {AddPieceToListService} from '../../add-piece-to-list.service';

@Component({
	selector: 'app-add-piece-to-list-form',
	templateUrl: './add-piece-to-list-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		FormComponent,
		FormFieldComponent,
		ReactiveFormsModule,
		InputComponent,
		DropdownComponent,
		DropdownItemComponent,
		ClickOutsideDirective,
	],
})
export class AddPieceToListFormComponent {
	readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	readonly addPieceToList = inject(AddPieceToListService);
	readonly pieceUtils = inject(PieceUtils);

	readonly form = new FormGroup(
		{
			status: new FormControl<PieceStatus | ''>('', {
				validators: Validators.required,
				nonNullable: true,
				updateOn: 'submit',
			}),
			score: new FormControl('', {nonNullable: true}),
			startDate: new FormControl('', {nonNullable: true}),
			finishDate: new FormControl('', {nonNullable: true}),
		},
		{updateOn: 'blur'},
	);

	readonly piece = input.required<CompletePiece>();
	readonly appSubmit = output<void>();
	readonly statusDropdownIsOpen = signal<boolean>(false);
	readonly selectedStatus = signal<string>('');

	get statusError(): string | undefined {
		const control = this.form.get('status');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Status is required.';
			}
		}

		return undefined;
	}

	handleStatusInputFocus() {
		this.statusDropdownIsOpen.set(true);
		this.fetchPieceStatuses.fetch().subscribe();
	}

	handleStatusInputClickOutside() {
		this.statusDropdownIsOpen.set(false);
	}

	handleStatusClick(status: PieceStatus) {
		this.form.controls.status.setValue(status);
		this.selectedStatus.set(this.pieceUtils.statusToText(status));
		this.statusDropdownIsOpen.set(false);
	}

	handleSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const {status, score, startDate, finishDate} = this.form.getRawValue();

		this.addPieceToList
			.add({
				id: this.piece().id,
				status: status as PieceStatus,
				score: Number(score),
				startedAt: startDate,
				finishedAt: finishDate,
			})
			.subscribe(() => {
				this.appSubmit.emit();
			});
	}
}
