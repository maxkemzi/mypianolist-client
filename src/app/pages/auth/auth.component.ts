import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContainerComponent} from '@shared/components';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth.component.html',
	imports: [ContainerComponent, RouterOutlet],
	standalone: true,
})
export class AuthPageComponent {}
