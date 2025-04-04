import {Component} from '@angular/core';
import {HeaderComponent} from '../../layout/header.component';
import {
	ContainerComponent,
	TypographyComponent,
} from '../../../shared/components';
import {RouterOutlet} from '@angular/router';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth.component.html',
	imports: [
		HeaderComponent,
		ContainerComponent,
		TypographyComponent,
		RouterOutlet,
	],
	standalone: true,
})
export default class AuthComponent {}
