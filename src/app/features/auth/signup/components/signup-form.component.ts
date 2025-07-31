import {Component, DestroyRef, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {
	ButtonComponent,
	FormFieldComponent,
	InputComponent,
	LinkComponent,
	ModalComponent,
	TypographyComponent,
} from '@shared/components';
import {passwordsMatchValidator} from '@shared/lib/validators';
import {SignupService} from '../signup.service';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		ModalComponent,
		FormFieldComponent,
		LinkComponent,
		ReactiveFormsModule,
		RouterLink,
		InputComponent,
	],
})
export class SignupFormComponent {
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);
	private readonly signup = inject(SignupService);

	readonly form = new FormGroup(
		{
			username: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),

			email: new FormControl('', {
				validators: [Validators.required, Validators.email],
				nonNullable: true,
			}),
			password: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
			confirmPassword: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
		},
		{validators: [passwordsMatchValidator('password', 'confirmPassword')]},
	);
	readonly isLoading = this.signup.isLoading;

	get usernameError(): string | null {
		const error = this.signup.error();
		if (error?.code === 'user_with_username_already_exists') {
			return 'User with that username already exists.';
		}

		const control = this.form.get('username');
		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Username is required.';
			}
		}

		return null;
	}

	get emailError(): string | null {
		const error = this.signup.error();
		if (error?.code === 'user_with_email_already_exists') {
			return 'User with that email already exists.';
		}

		const control = this.form.get('email');
		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Email is required.';
			} else if (control.errors?.['email']) {
				return 'Email is invalid.';
			}
		}

		return null;
	}

	get passwordError(): string | null {
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
			} else if (this.form.errors?.['passwordsMatch']) {
				return "Passwords doesn't match.";
			}
		}

		return null;
	}

	onSubmit = () => {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const {username, email, password} = this.form.getRawValue();
		this.signup
			.signUp({username, email, password})
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.router.navigate(['/auth/login']);
				},
				error: () => {
					console.error('Error signing up.');
				},
			});
	};
}
