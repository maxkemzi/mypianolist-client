import {Component, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [TypographyComponent],
})
export class FormFieldComponent extends ClassMergeDirective {
	readonly label = input<string>('Label');
	readonly error = input<string | null>();

	protected override defaultClass(): string {
		return 'inline-block w-full max-w-[275px]';
	}
}
