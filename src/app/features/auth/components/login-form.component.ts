import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {
	ButtonComponent,
	FormComponent,
	FormFieldComponent,
	LinkComponent,
	TypographyComponent,
} from '@shared/components';
import {AuthService} from '../auth.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	imports: [
		TypographyComponent,
		ButtonComponent,
		LinkComponent,
		FormComponent,
		FormFieldComponent,
		ReactiveFormsModule,
	],
	standalone: true,
})
export class LoginFormComponent {
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	private service = inject(AuthService);

	form = this.formBuilder.nonNullable.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
	});

	get usernameError(): string | undefined {
		const control = this.form.get('username');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Username is required.';
			}
		}

		return undefined;
	}

	get passwordError(): string | undefined {
		const control = this.form.get('password');

		if (control?.touched) {
			if (control?.errors?.['required']) {
				return 'Password is required.';
			}
		}

		return undefined;
	}

	onSubmit = () => {
		if (this.form.invalid) {
			return;
		}

		this.service.logIn(this.form.getRawValue()).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: () => {
				console.error('Error logging in.');
			},
		});
	};
}
