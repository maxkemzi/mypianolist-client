import {Component, DestroyRef, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	AbstractControl,
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
import {AuthService} from '../auth.service';

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
	private readonly service = inject(AuthService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly auth = inject(AuthService);

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
		{validators: [this.passwordsMatchValidator], updateOn: 'blur'},
	);
	readonly isLoading = this.auth.isSigningUp;

	passwordsMatchValidator(form: AbstractControl) {
		const password = form.get('password')?.value;
		const confirmPassword = form.get('confirmPassword')?.value;

		return password !== confirmPassword ? {passwordsMismatch: true} : null;
	}

	get usernameError(): string | undefined {
		const control = this.form.get('username');

		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Username is required.';
			}
		}

		return undefined;
	}

	get emailError(): string | undefined {
		const control = this.form.get('email');

		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Email is required.';
			} else if (control.errors?.['email']) {
				return 'Email is invalid.';
			}
		}

		return undefined;
	}

	get passwordError(): string | undefined {
		const control = this.form.get('password');

		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Password is required.';
			}
		}

		return undefined;
	}

	get confirmPasswordError(): string | undefined {
		const control = this.form.get('confirmPassword');

		if (control?.touched) {
			if (control.errors?.['required']) {
				return 'Password confirmation is required.';
			} else if (this.form.errors?.['passwordsMismatch']) {
				return "Passwords doesn't match.";
			}
		}

		return undefined;
	}

	onSubmit = () => {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const {username, email, password} = this.form.getRawValue();
		this.service
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
