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
import {PieceStatusesSelect} from '@features/piece/fetch-statuses';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {EditPieceService} from '../../edit-piece.service';
import {pastOrPresentValidator} from '@shared/lib/validators';

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
			}),
			score: new FormControl('', {nonNullable: true}),
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

	ngOnInit(): void {
		const {status, score, startedAt, finishedAt} = this.piece();
		this.form.setValue({status, score: String(score), startedAt, finishedAt});
	}

	get statusError(): string | null {
		const control = this.form.get('status');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Status is required.';
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
