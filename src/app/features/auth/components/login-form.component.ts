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
	form = new FormGroup(
		{
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
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
}
