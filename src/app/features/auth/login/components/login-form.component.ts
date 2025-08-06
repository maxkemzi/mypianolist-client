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
import {LoginService} from '../login.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		LinkComponent,
		ModalComponent,
		FormFieldComponent,
		ReactiveFormsModule,
		RouterLink,
		InputComponent,
	],
})
export class LoginFormComponent {
	private readonly router = inject(Router);
	private readonly login = inject(LoginService);
	private readonly destroyRef = inject(DestroyRef);

	readonly form = new FormGroup({
		username: new FormControl('', {
			validators: Validators.required,
			nonNullable: true,
		}),
		password: new FormControl('', {
			validators: Validators.required,
			nonNullable: true,
		}),
	});
	readonly isLoading = this.login.isLoading;

	get error(): string | null {
		const error = this.login.error();
		if (error?.code === 'wrong_credentials') {
			return 'Wrong username or password.';
		}

		return null;
	}

	get usernameError(): string | null {
		const control = this.form.get('username');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Username is required.';
			}
		}

		return null;
	}

	get passwordError(): string | null {
		const control = this.form.get('password');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Password is required.';
			}
		}

		return null;
	}

	onSubmit = () => {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.login
			.logIn(this.form.getRawValue())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.router.navigate(['/']);
				},
				error: () => {
					console.error('Error logging in.');
				},
			});
	};
}
