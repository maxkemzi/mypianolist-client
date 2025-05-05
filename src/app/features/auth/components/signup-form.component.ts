import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {
	ButtonComponent,
	FormComponent,
	FormFieldComponent,
	LinkComponent,
	TypographyComponent,
} from '@shared/components';
import {AuthService} from '../auth.service';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		FormComponent,
		FormFieldComponent,
		LinkComponent,
		ReactiveFormsModule,
		RouterLink,
	],
})
export class SignupFormComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly router = inject(Router);
	private readonly service = inject(AuthService);

	form = this.formBuilder.nonNullable.group({
		username: ['', Validators.required],
		email: ['', Validators.email],
		password: ['', Validators.required],
	});

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

	onSubmit = () => {
		if (this.form.invalid) {
			return;
		}

		this.service.signUp(this.form.getRawValue()).subscribe({
			next: () => {
				this.router.navigate(['/auth/login']);
			},
			error: () => {
				console.error('Error signing up.');
			},
		});
	};
}
