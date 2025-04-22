import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	imports: [CommonModule],
})
export class FormComponent {
	@Input() class?: string;

	get classes() {
		return twMerge('bg-background p-12 rounded-xl', this.class);
	}
}
