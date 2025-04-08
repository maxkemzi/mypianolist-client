import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
	HeaderComponent,
	HeaderProfileComponent,
	LogoComponent,
	NavbarComponent,
} from '../../widgets';

@Component({
	selector: 'app-base-layout',
	templateUrl: './base-layout.component.html',
	imports: [
		RouterOutlet,
		HeaderComponent,
		LogoComponent,
		NavbarComponent,
		HeaderProfileComponent,
	],
	standalone: true,
})
export class BaseLayoutComponent {}
