import {
	Component,
	DestroyRef,
	HostBinding,
	inject,
	input,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router, RouterLink} from '@angular/router';
import {LogoutService} from '@features/auth/logout';
import {
	AvatarComponent,
	DropdownItemComponent,
	DropdownMenuComponent,
	TypographyComponent,
} from '@shared/components';
import {BreakpointService, ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	imports: [
		TypographyComponent,
		ClickOutsideDirective,
		DropdownMenuComponent,
		DropdownItemComponent,
		RouterLink,
		AvatarComponent,
	],
})
export class ProfileComponent {
	private readonly logout = inject(LogoutService);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);
	readonly breakpoint = inject(BreakpointService);

	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);
	readonly isLoggingOut = this.logout.isLoading;

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

	onListClick() {
		this.router.navigate(['/list', this.username()]);
		this.dropdownIsOpen.set(false);
	}

	onProfileClick() {
		this.router.navigate(['/profile', this.username()]);
		this.dropdownIsOpen.set(false);
	}

	onSettingsClick() {
		this.router.navigate(['/settings']);
		this.dropdownIsOpen.set(false);
	}

	onLogoutClick() {
		this.logout
			.logOut()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.router.navigate(['/auth/login']);
			});
	}
}
