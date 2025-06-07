import {
	Component,
	computed,
	HostBinding,
	inject,
	input,
	signal,
} from '@angular/core';
import {Router} from '@angular/router';
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
	private readonly router = inject(Router);
	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);
	readonly isLoggingOut = signal<boolean>(false);

	readonly avatarPath = computed(() => `/images/${this.avatar()}`);

	@HostBinding('class')
	get classes() {
		return 'flex items-center gap-3';
	}

	onClickOutside() {
		if (this.dropdownIsOpen()) {
			this.dropdownIsOpen.set(false);
		}
	}

	toggleDropdownIsOpen() {
		this.dropdownIsOpen.update(value => !value);
	}

	onLogoutClick() {
		this.isLoggingOut.set(true);
		this.auth
			.logOut()
			.pipe(finalize(() => this.isLoggingOut.set(false)))
			.subscribe(() => {
				this.router.navigate(['/auth/login']);
			});
	}

	onImageError() {
		this.imageHasError.set(true);
	}
}
