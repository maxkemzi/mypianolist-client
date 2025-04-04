import {Component} from '@angular/core';
import {
	ButtonComponent,
	InputComponent,
	TypographyComponent,
} from '../../../shared/components';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	imports: [TypographyComponent, ButtonComponent, InputComponent],
	standalone: true,
})
export default class SignupFormComponent {}
