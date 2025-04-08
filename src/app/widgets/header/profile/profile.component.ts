import {Component} from '@angular/core';
import {ButtonComponent} from '../../../shared/components';

@Component({
	selector: 'app-header-profile',
	templateUrl: './profile.component.html',
	imports: [ButtonComponent],
	standalone: true,
})
export class HeaderProfileComponent {}
