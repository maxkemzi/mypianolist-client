import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import {first, map, Observable} from 'rxjs';

const passwordsMismatchValidator =
	(passwordField: string, confirmPasswordField: string): ValidatorFn =>
	(form: AbstractControl) => {
		const password = form.get(passwordField)?.value;
		const confirmPassword = form.get(confirmPasswordField)?.value;

		return password !== confirmPassword ? {passwordsMismatch: true} : null;
	};

const sameAsCurrentValidator = <T>(
	currentValue$: Observable<T>,
): AsyncValidatorFn => {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return currentValue$.pipe(
			map(current =>
				current !== control.value ? null : {sameAsCurrent: true},
			),
			first(),
		);
	};
};

export {passwordsMismatchValidator, sameAsCurrentValidator};
