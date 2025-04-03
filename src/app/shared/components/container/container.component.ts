import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	imports: [CommonModule],
	standalone: true,
})
export class ContainerComponent {
	@Input() size: 'md' | 'lg' = 'lg';
}
