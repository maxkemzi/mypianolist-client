import {Component} from '@angular/core';
import {ContainerComponent, TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	imports: [ContainerComponent, TypographyComponent],
	host: {class: 'flex-1'},
})
export class HomePageComponent {}
