import {CommonModule} from '@angular/common';
import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	imports: [CommonModule],
	standalone: true,
})
export class ButtonComponent {
	@Input() variant: 'primary' | 'secondary' = 'primary';
	@Input({transform: booleanAttribute}) submit: boolean = false;
}
