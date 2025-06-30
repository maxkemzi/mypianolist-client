import {Component} from '@angular/core';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	imports: [ContainerComponent, TypographyComponent],
})
export class HomePageComponent {}
