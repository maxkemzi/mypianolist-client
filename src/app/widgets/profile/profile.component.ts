import {Component, computed, inject, input, signal} from '@angular/core';
import {AuthService} from '@features/auth';
import {
	DropdownComponent,
	DropdownItemComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {finalize} from 'rxjs';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	imports: [
		TypographyComponent,
		ClickOutsideDirective,
		DropdownComponent,
		DropdownItemComponent,
	],
})
export class ProfileComponent {
	private readonly auth = inject(AuthService);
	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);
	readonly isLoggingOut = signal<boolean>(false);

	readonly avatarPath = computed(() => `/images/${this.avatar()}`);

	handleImageError() {
		this.imageHasError.set(true);
	}

	toggleDropdownIsOpen() {
		this.dropdownIsOpen.update(value => !value);
	}

	handleLogout() {
		this.isLoggingOut.set(true);
		this.auth
			.logOut()
			.pipe(finalize(() => this.isLoggingOut.set(false)))
			.subscribe();
	}

	handleClickOutside() {
		if (this.dropdownIsOpen()) {
			this.dropdownIsOpen.set(false);
		}
	}
}
