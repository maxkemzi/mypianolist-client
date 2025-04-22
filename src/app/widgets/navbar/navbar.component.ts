import {Component} from '@angular/core';
import {TypographyComponent} from '@shared/components';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	imports: [TypographyComponent, RouterLink],
})
export class NavbarComponent {}
