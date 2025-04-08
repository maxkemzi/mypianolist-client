import {Component} from '@angular/core';
import {TypographyComponent} from '../../shared/components';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	imports: [TypographyComponent],
	standalone: true,
})
export class NavbarComponent {}
