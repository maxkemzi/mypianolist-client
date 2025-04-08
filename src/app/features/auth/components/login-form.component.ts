import {Component} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {
	ButtonComponent,
	InputComponent,
	TypographyComponent,
} from '../../../shared/components';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	imports: [
		ReactiveFormsModule,
		TypographyComponent,
		ButtonComponent,
		InputComponent,
	],
	standalone: true,
})
export class LoginFormComponent {
	form = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});
}
