import {Component, DestroyRef, inject, input, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Piece, PieceStatusType} from '@entities/piece';
import {PieceStatusesSelect} from '@features/piece/fetch-statuses';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {AddPieceToListService} from '../../add-piece-to-list.service';
import {pastOrPresentValidator} from '@shared/lib/validators';

@Component({
	selector: 'app-add-piece-to-list-form',
	templateUrl: './add-piece-to-list-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		ModalComponent,
		FormFieldComponent,
		ReactiveFormsModule,
		InputComponent,
		PieceStatusesSelect,
	],
})
export class AddPieceToListFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(AddPieceToListService);

	readonly piece = input.required<Piece>();
	readonly appSubmit = output<void>();

	readonly form = new FormGroup(
		{
			status: new FormControl<PieceStatusType | ''>('', {
				validators: Validators.required,
				nonNullable: true,
			}),
			score: new FormControl('', {
				validators: [Validators.min(0), Validators.max(10)],
				nonNullable: true,
			}),
			startedAt: new FormControl('', {
				validators: pastOrPresentValidator,
				nonNullable: true,
			}),
			finishedAt: new FormControl('', {
				validators: pastOrPresentValidator,
				nonNullable: true,
			}),
		},
		{updateOn: 'blur'},
	);

	readonly isLoading = this.service.isLoading;

	get statusError(): string | null {
		const control = this.form.get('status');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Status is required.';
			}
		}

		return null;
	}

	get scoreError(): string | null {
		const control = this.form.get('score');

		if (control?.touched) {
			if (control?.errors?.['min']) {
				return 'Minimum score is 0.';
			}
			if (control?.errors?.['max']) {
				return 'Maximum score is 10.';
			}
		}

		return null;
	}

	get startedAtError(): string | null {
		const control = this.form.get('startedAt');

		if (control?.touched) {
			if (control?.errors?.['pastOrPresent']) {
				return 'Date must be in the past or present.';
			}
		}

		return null;
	}

	get finishedAtError(): string | null {
		const control = this.form.get('finishedAt');

		if (control?.touched) {
			if (control?.errors?.['pastOrPresent']) {
				return 'Date must be in the past or present.';
			}
		}

		return null;
	}

	onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const {status, score, startedAt, finishedAt} = this.form.getRawValue();

		this.service
			.add({
				id: this.piece().id,
				status: status as PieceStatusType,
				score: Number(score),
				startedAt,
				finishedAt,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appSubmit.emit();
			});
	}
}
