import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
	HeaderComponent,
	ProfileComponent,
	LogoComponent,
	NavbarComponent,
	AuthButtonsComponent,
} from '../../widgets';
import {AuthService} from '../../features/auth/auth.service';
import {CommonModule} from '@angular/common';

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
	standalone: true,
})
export class BaseLayoutComponent {
	auth = inject(AuthService);
}
