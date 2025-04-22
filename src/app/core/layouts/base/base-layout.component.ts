import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';
import {
	AuthButtonsComponent,
	HeaderComponent,
	LogoComponent,
	NavbarComponent,
	ProfileComponent,
} from '@widgets';

@Component({
	selector: 'app-base-layout',
	templateUrl: './base-layout.component.html',
	imports: [
		CommonModule,
		RouterOutlet,
		HeaderComponent,
		LogoComponent,
		NavbarComponent,
		ProfileComponent,
		AuthButtonsComponent,
	],
})
export class BaseLayoutComponent {
	auth = inject(AuthService);
}
