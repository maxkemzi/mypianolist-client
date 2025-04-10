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

	get usernameError() {
		if (this.form.get('username')?.errors?.['required']) {
			return 'Username is required.';
		}

		return undefined;
	}

	get passwordError() {
		if (this.form.get('password')?.errors?.['required']) {
			return 'Password is required.';
		}

		return undefined;
	}
}
