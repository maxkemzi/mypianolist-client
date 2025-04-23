import {CommonModule} from '@angular/common';
import {Component, forwardRef, Input, input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {twMerge} from 'tailwind-merge';
import {InputComponent} from '../input';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [CommonModule, InputComponent, TypographyComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormFieldComponent),
			multi: true,
		},
	],
})
export class FormFieldComponent implements ControlValueAccessor {
	readonly class = input<string>();
	readonly type = input<'text' | 'password'>('text');
	readonly label = input<string>('Label');
	readonly placeholder = input<string>();
	readonly error = input<string>();
	value: string = '';
	disabled: boolean = false;

	get classes() {
		return twMerge(this.class());
	}

	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(disabled: boolean): void {
		this.disabled = disabled;
	}

	handleInput = (event: Event): void => {
		const input = event.target as HTMLInputElement;
		this.value = input.value;
		this.onChange(this.value);
	};
}
