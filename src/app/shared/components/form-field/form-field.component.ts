import {Component, HostBinding, input} from '@angular/core';
import {TypographyComponent} from '../typography';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [TypographyComponent],
})
export class FormFieldComponent extends ClassMergeDirective {
	readonly label = input<string>('Label');
	readonly error = input<string>();

	protected override defaultClass(): string {
		return 'inline-block w-full max-w-[275px]';
	}
}
