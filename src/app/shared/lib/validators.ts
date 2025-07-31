import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import {first, map, Observable} from 'rxjs';

const passwordsMatchValidator =
	(passwordField: string, confirmPasswordField: string): ValidatorFn =>
	(form: AbstractControl) => {
		const password = form.get(passwordField)?.value;
		const confirmPassword = form.get(confirmPasswordField)?.value;

		return password !== confirmPassword ? {passwordsMatch: true} : null;
	};

const differentFromCurrentValidator = <T>(
	currentValue$: Observable<T>,
): AsyncValidatorFn => {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return currentValue$.pipe(
			map(current =>
				current !== control.value ? null : {differentFromCurrent: true},
			),
			first(),
		);
	};
};

const pastOrPresentValidator: ValidatorFn = (control: AbstractControl) => {
	const value = control.value;
	if (!value) return null;

	const date = new Date(value);
	const today = new Date();

	date.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);

	return date > today ? {pastOrPresent: true} : null;
};

export {
	passwordsMatchValidator,
	differentFromCurrentValidator,
	pastOrPresentValidator,
};
