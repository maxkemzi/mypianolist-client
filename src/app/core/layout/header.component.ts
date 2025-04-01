import {booleanAttribute, Component, Input} from '@angular/core';
import {ContainerComponent} from '../../shared/components/container.component';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../shared/components/button.component';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [CommonModule, ContainerComponent, RouterLink, ButtonComponent],
	standalone: true,
})
export class HeaderComponent {
	@Input({transform: booleanAttribute}) absolute: boolean = false;
}
