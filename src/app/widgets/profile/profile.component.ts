import {Component, computed, inject, input, signal} from '@angular/core';
import {AuthService} from '@features/auth';
import {TypographyComponent} from '@shared/components';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	imports: [TypographyComponent],
})
export class ProfileComponent {
	private auth = inject(AuthService);
	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);

	readonly avatarPath = computed(() => `/images/${this.avatar()}`);

	setImageHasError() {
		this.imageHasError.set(true);
	}

	toggleDropdownIsOpen() {
		this.dropdownIsOpen.update(value => !value);
	}

	logOut() {
		this.auth.logOut().subscribe();
	}
}
