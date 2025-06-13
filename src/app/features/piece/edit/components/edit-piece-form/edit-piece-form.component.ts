import {
	Component,
	DestroyRef,
	inject,
	input,
	OnInit,
	output,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PieceStatusType, UserPiece} from '@entities/piece';
import {PieceStatusesSelect} from '@features/piece/fetchStatuses';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {EditPieceService} from '../../edit-piece.service';

@Component({
	selector: 'app-edit-piece-form',
	templateUrl: './edit-piece-form.component.html',
	imports: [
		ReactiveFormsModule,
		FormFieldComponent,
		ButtonComponent,
		InputComponent,
		TypographyComponent,
		ModalComponent,
		PieceStatusesSelect,
	],
})
export class EditPieceFormComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly service = inject(EditPieceService);

	readonly piece = input.required<UserPiece>();
	readonly appSubmit = output<void>();

	readonly form = new FormGroup(
		{
			status: new FormControl<PieceStatusType | ''>('', {
				nonNullable: true,
				updateOn: 'submit',
			}),
			score: new FormControl('', {nonNullable: true}),
			startedAt: new FormControl('', {nonNullable: true}),
			finishedAt: new FormControl('', {nonNullable: true}),
		},
		{updateOn: 'blur'},
	);
	readonly isLoading = this.service.isLoading.asReadonly();

	ngOnInit(): void {
		const {status, score, startedAt, finishedAt} = this.piece();
		this.form.setValue({status, score: String(score), startedAt, finishedAt});
	}

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

		const {status, score, startedAt, finishedAt} = this.form.getRawValue();

		this.service
			.edit(this.piece().id, {
				status: status || undefined,
				score: score ? Number(score) : undefined,
				startedAt: startedAt || undefined,
				finishedAt: finishedAt || undefined,
			})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.appSubmit.emit();
			});
	}
}
