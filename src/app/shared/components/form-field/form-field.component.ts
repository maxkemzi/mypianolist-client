import {Component, input} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [TypographyComponent],
})
export class FormFieldComponent {
	readonly label = input<string>('Label');
	readonly error = input<string>();
}
