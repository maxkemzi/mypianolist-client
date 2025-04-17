import {Component} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {
	ButtonComponent,
	FormComponent,
	FormFieldComponent,
	LinkComponent,
	TypographyComponent,
} from '../../../shared/components';

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
	],
	standalone: true,
})
export class SignupFormComponent {
	form = new FormGroup({
		username: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
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
}
