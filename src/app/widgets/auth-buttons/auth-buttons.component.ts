import {Component} from '@angular/core';
import {ButtonComponent} from '../../shared/components';

@Component({
	selector: 'app-auth-buttons',
	templateUrl: './auth-buttons.component.html',
	imports: [ButtonComponent],
	standalone: true,
})
export class AuthButtonsComponent {}
