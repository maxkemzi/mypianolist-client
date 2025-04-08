import {Component} from '@angular/core';
import {ContainerComponent, TypographyComponent} from '../../shared/components';

@Component({
	selector: 'app-home-page',
	templateUrl: './home.component.html',
	imports: [ContainerComponent, TypographyComponent],
	standalone: true,
})
export class HomePageComponent {}
