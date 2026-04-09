import {BreakpointObserver} from '@angular/cdk/layout';
import {
	Component,
	DestroyRef,
	HostBinding,
	inject,
	input,
	signal,
} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {Router, RouterLink} from '@angular/router';
import {LogoutService} from '@features/auth/logout';
import {
	AvatarComponent,
	DropdownItemComponent,
	DropdownMenuComponent,
	TypographyComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';
import {map} from 'rxjs/operators';

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
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly logout = inject(LogoutService);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);

	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);
	readonly isLoggingOut = this.logout.isLoading;
	readonly isDesktop = toSignal(
		this.breakpointObserver
			.observe(['(min-width: 640px)'])
			.pipe(map(result => result.matches)),
		{initialValue: window.innerWidth >= 640},
	);

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
