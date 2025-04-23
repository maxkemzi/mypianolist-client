import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, input} from '@angular/core';
import {ContainerComponent} from '@shared/components';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [CommonModule, ContainerComponent],
})
export class HeaderComponent {
	readonly absolute = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});
}
