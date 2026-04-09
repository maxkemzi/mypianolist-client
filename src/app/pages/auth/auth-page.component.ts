import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContainerComponent} from '@shared/components';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth-page.component.html',
	imports: [ContainerComponent, RouterOutlet],
	host: {class: 'flex-1'},
})
export class AuthPageComponent {}
