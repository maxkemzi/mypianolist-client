import {Component, inject} from '@angular/core';
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

	get classes() {
		return twJoin('flex min-h-[88px] py-4 bg-background');
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
