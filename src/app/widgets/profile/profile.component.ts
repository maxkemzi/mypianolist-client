import {Component, inject, Input, signal} from '@angular/core';
import {TypographyComponent} from '@shared/components';
import {AuthService} from '@features/auth';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	imports: [TypographyComponent],
})
export class ProfileComponent {
	private auth = inject(AuthService);
	@Input() username: string = 'username';
	@Input() avatar: string | null = null;
	imageHasError = signal<boolean>(false);
	dropdownIsOpen = signal<boolean>(false);

	get avatarSrc() {
		return `/images/${this.avatar}`;
	}

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
