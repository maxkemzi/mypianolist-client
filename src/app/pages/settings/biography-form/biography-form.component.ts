import {Component, DestroyRef, inject, Injector, model} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {UpdateBiographyService} from '@features/user/profile/update-biography';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
} from '@shared/components';
import {sameAsCurrentValidator} from '@shared/lib/validators';
import {first, map} from 'rxjs';

@Component({
	selector: 'app-biography-form',
	templateUrl: './biography-form.component.html',
	imports: [
		ButtonComponent,
		FormsModule,
		ReactiveFormsModule,
		InputComponent,
		FormFieldComponent,
	],
})
export class BiographyFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly injector = inject(Injector);
	private readonly updateBiography = inject(UpdateBiographyService);

	readonly defaultBiography = model.required<string | null>();
	readonly defaultBiography$ = toObservable(this.defaultBiography, {
		injector: this.injector,
	});
	readonly control = new FormControl('', {
		asyncValidators: [sameAsCurrentValidator(this.defaultBiography$)],
		nonNullable: true,
	});

	constructor() {
		toObservable(this.defaultBiography)
			.pipe(takeUntilDestroyed())
			.subscribe(biography => {
				this.control.reset(biography || '');
			});
	}

	differentFromCurrentValidator(control: AbstractControl) {
		return toObservable(this.defaultBiography, {
			injector: this.injector,
		}).pipe(
			map(value => {
				return value !== control.value
					? null
					: {notDifferentFromCurrent: true};
			}),
			first(),
		);
	}

	get error(): string | null {
		if (this.control?.touched) {
			if (this.control?.errors?.['sameAsCurrent']) {
				return 'Biography must be different from the current one.';
			}
		}

		return null;
	}

	get submitButtonIsDisabled() {
		return (
			(this.control.touched && this.control.invalid) ||
			this.updateBiography.isLoading()
		);
	}

	onSubmit() {
		this.control.markAsTouched();

		if (this.control.invalid) {
			return;
		}

		this.updateBiography
			.update(this.control.value)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({biography}) => {
				this.defaultBiography.set(biography);
			});
	}
}
