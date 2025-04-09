import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {twMerge} from 'tailwind-merge';
import {InputComponent} from '../input';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [CommonModule, InputComponent, TypographyComponent],
	standalone: true,
})
export class FormFieldComponent {
	@Input() type: 'text' | 'password' = 'text';
	@Input() label: string = 'Label';
	@Input() class?: string;
	@Input() placeholder?: string;

	get classes() {
		return twMerge(this.class);
	}
}
