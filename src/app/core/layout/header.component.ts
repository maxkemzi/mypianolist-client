import {booleanAttribute, Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
	ButtonComponent,
	ContainerComponent,
	TypographyComponent,
} from '../../shared/components';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [
		CommonModule,
		ContainerComponent,
		RouterLink,
		ButtonComponent,
		TypographyComponent,
	],
	standalone: true,
})
export class HeaderComponent {
	@Input({transform: booleanAttribute}) absolute: boolean = false;
}
