import {Component, DestroyRef, inject, Injector, model} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {UpdateUsernameService} from '@features/user/update-username';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
} from '@shared/components';
import {first, map} from 'rxjs';

@Component({
	selector: 'app-username-form',
	templateUrl: './username-form.component.html',
	imports: [
		FormFieldComponent,
		FormsModule,
		ReactiveFormsModule,
		InputComponent,
		ButtonComponent,
	],
})
export class UsernameFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly injector = inject(Injector);
	private readonly updateUsername = inject(UpdateUsernameService);

	readonly defaultUsername = model.required<string>();
	readonly control = new FormControl('', {
		validators: [Validators.required],
		asyncValidators: [this.differentFromCurrentValidator.bind(this)],
		nonNullable: true,
	});

	constructor() {
		toObservable(this.defaultUsername).subscribe(username => {
			this.control.reset(username);
		});
	}

	differentFromCurrentValidator(control: AbstractControl) {
		return toObservable(this.defaultUsername, {injector: this.injector}).pipe(
			map(value => {
				return value !== control.value
					? null
					: {notDifferentFromCurrent: true};
			}),
			first(),
		);
	}

	get error(): string | undefined {
		if (this.control?.touched) {
			if (this.control?.errors?.['required']) {
				return 'Username is required.';
			}
			if (this.control?.errors?.['notDifferentFromCurrent']) {
				return 'Username must be different from the current one.';
			}
		}

		return undefined;
	}

	get submitButtonIsDisabled() {
		return (
			(this.control.touched && this.control.invalid) ||
			this.updateUsername.isLoading()
		);
	}

	onSubmit() {
		this.control.markAsTouched();

		if (this.control.invalid) {
			return;
		}

		const username = this.control.value;
		this.updateUsername
			.update(username)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.defaultUsername.set(username);
			});
	}
}
