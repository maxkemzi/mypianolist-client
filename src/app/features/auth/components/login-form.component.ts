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
import {Router} from '@angular/router';
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
	form = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	constructor(
		private router: Router,
		private service: AuthService,
	) {}

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

		const {username, password} = this.form.value;

		this.service.logIn({username: username!, password: password!}).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: () => {
				console.error('Error logging in.');
			},
		});
	};
}
