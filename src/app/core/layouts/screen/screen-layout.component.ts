import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';
import {
	AuthButtonsComponent,
	HeaderComponent,
	ListButtonComponent,
	LogoComponent,
	NavbarComponent,
	ProfileComponent,
} from '@widgets';

@Component({
	selector: 'app-screen-layout',
	templateUrl: './screen-layout.component.html',
	imports: [
		RouterOutlet,
		HeaderComponent,
		LogoComponent,
		NavbarComponent,
		ProfileComponent,
		AuthButtonsComponent,
		ListButtonComponent,
	],
})
export class ScreenLayoutComponent {
	readonly auth = inject(AuthService);
}
