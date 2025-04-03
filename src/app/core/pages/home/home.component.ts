import {Component} from '@angular/core';
import {
	ContainerComponent,
	TypographyComponent,
} from '../../../shared/components';
import {HeaderComponent} from '../../layout/header.component';

@Component({
	selector: 'app-home-page',
	templateUrl: './home.component.html',
	imports: [HeaderComponent, ContainerComponent, TypographyComponent],
	standalone: true,
})
export default class HomeComponent {}
