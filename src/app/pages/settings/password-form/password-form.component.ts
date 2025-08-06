import {Component, DestroyRef, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {UpdatePasswordService} from '@features/user/update-password';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
} from '@shared/components';
import {passwordsMatchValidator} from '@shared/lib/validators';

@Component({
	selector: 'app-password-form',
	templateUrl: './password-form.component.html',
	imports: [
		FormFieldComponent,
		ReactiveFormsModule,
		FormsModule,
		ButtonComponent,
		InputComponent,
	],
})
export class PasswordFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly updatePassword = inject(UpdatePasswordService);

	readonly form = new FormGroup(
		{
			password: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
			confirmPassword: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
		},
		{validators: passwordsMatchValidator('password', 'confirmPassword')},
	);

	get passwordError(): string | null {
		const error = this.updatePassword.error();
		if (error?.code === 'same_password') {
			return 'New password must be different from the current one.';
		}

		const control = this.form.get('password');
		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Password is required.';
			}
		}

		return null;
	}

	get confirmPasswordError(): string | null {
		const control = this.form.get('confirmPassword');

		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Password confirmation is required.';
			}
			if (this.form.errors?.['passwordsMatch']) {
				return "Passwords doesn't match.";
			}
		}

		return null;
	}

	get submitButtonIsDisabled() {
		return this.updatePassword.isLoading();
	}

	onSubmit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const {password} = this.form.getRawValue();
		this.updatePassword
			.update(password)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
