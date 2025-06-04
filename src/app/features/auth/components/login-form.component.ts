import {Component, inject} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {
	ButtonComponent,
	FormComponent,
	FormFieldComponent,
	InputComponent,
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
		RouterLink,
		InputComponent,
	],
})
export class LoginFormComponent {
	private readonly router = inject(Router);
	private readonly service = inject(AuthService);

	readonly form = new FormGroup(
		{
			username: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
			password: new FormControl('', {
				validators: Validators.required,
				nonNullable: true,
			}),
		},
		{updateOn: 'blur'},
	);

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
		this.form.markAllAsTouched();

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
