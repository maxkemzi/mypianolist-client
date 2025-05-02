import {CommonModule} from '@angular/common';
import {Component, input} from '@angular/core';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	imports: [CommonModule],
})
export class FormComponent {
	readonly formClass = input<string>();

	getFormClasses(classes: string) {
		return twMerge(classes, this.formClass());
	}
}
