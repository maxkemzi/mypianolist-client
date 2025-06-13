import {Component, DestroyRef, inject, input, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Piece, PieceStatusType, PieceUtils} from '@entities/piece';
import {
	FetchPieceStatusesService,
	PieceStatusesSelect,
} from '@features/piece/fetchStatuses';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {AddPieceToListService} from '../../add-piece-to-list.service';

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

	readonly fetchPieceStatuses = inject(FetchPieceStatusesService);
	readonly addPieceToList = inject(AddPieceToListService);
	readonly pieceUtils = inject(PieceUtils);

	readonly form = new FormGroup(
		{
			status: new FormControl<PieceStatusType | ''>('', {
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

	readonly piece = input.required<Piece>();
	readonly appSubmit = output<void>();

	get statusError(): string | undefined {
		const control = this.form.get('status');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Status is required.';
			}
		}

		return undefined;
	}

	onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const {status, score, startDate, finishDate} = this.form.getRawValue();

		this.addPieceToList
			.add({
				id: this.piece().id,
				status: status as PieceStatusType,
				score: Number(score),
				startedAt: startDate,
				finishedAt: finishDate,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appSubmit.emit();
			});
	}
}
