import {Component, HostBinding} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/components';

@Component({
	selector: 'app-auth-buttons',
	templateUrl: './auth-buttons.component.html',
	imports: [ButtonComponent, RouterLink],
})
export class AuthButtonsComponent {
	@HostBinding('class')
	get classes(): string {
		return 'flex gap-4';
	}
}
