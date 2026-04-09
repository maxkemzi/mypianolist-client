import {booleanAttribute, Component, inject, input} from '@angular/core';
import {AuthService} from '@features/auth';
import {ContainerComponent} from '@shared/components';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [ContainerComponent],
})
export class HeaderComponent {
	readonly auth = inject(AuthService);

	readonly absolute = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	get classes() {
		return twJoin(
			'py-4 bg-background z-20',
			this.absolute() && 'absolute top-0 left-0 w-full',
		);
	}

	get flexContainerClasses() {
		return twJoin(
			'h-full flex justify-between items-center gap-4',
			this.auth.user() === null && 'max-sm:flex-col max-sm:justify-center',
		);
	}

	get leftBlockClasses() {
		return twJoin(
			'flex items-center gap-7 max-sm:gap-4',
			this.auth.user() !== null && 'max-sm:flex-col max-sm:items-start',
		);
	}
}
