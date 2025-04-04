import {Component} from '@angular/core';
import {
	ButtonComponent,
	InputComponent,
	TypographyComponent,
} from '../../../shared/components';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	imports: [TypographyComponent, ButtonComponent, InputComponent],
	standalone: true,
})
export default class LoginFormComponent {}
