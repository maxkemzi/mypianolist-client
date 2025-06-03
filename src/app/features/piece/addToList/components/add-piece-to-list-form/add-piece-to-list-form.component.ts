import {Component, inject, input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompletePiece} from '@entities/piece';
import {
	ButtonComponent,
	FormComponent,
	FormFieldComponent,
	InputComponent,
	TypographyComponent,
} from '@shared/components';

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
	],
})
export class AddPieceToListFormComponent {
	private readonly formBuilder = inject(FormBuilder);

	piece = input.required<CompletePiece>();

	form = this.formBuilder.nonNullable.group({
		status: ['', Validators.required],
		startDate: ['', Validators.required],
		finishDate: ['', Validators.required],
	});

	get statusError(): string | undefined {
		const control = this.form.get('status');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Status is required.';
			}
		}

		return undefined;
	}

	get startDateError(): string | undefined {
		const control = this.form.get('startDate');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Start date is required.';
			}
		}

		return undefined;
	}

	get finishDateError(): string | undefined {
		const control = this.form.get('finishDate');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Finish date is required.';
			}
		}

		return undefined;
	}
}
