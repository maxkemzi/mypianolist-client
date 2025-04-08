import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, Input} from '@angular/core';
import {ContainerComponent} from '../../shared/components';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [CommonModule, ContainerComponent],
	standalone: true,
})
export class HeaderComponent {
	@Input({transform: booleanAttribute}) absolute: boolean = false;
}
