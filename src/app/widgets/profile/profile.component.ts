import {
	Component,
	computed,
	DestroyRef,
	HostBinding,
	inject,
	input,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {AuthService} from '@features/auth';
import {
	DropdownItemComponent,
	DropdownMenuComponent,
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
		DropdownMenuComponent,
		DropdownItemComponent,
	],
})
export class ProfileComponent {
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);

	readonly username = input<string>('username');
	readonly avatar = input<string | null>(null);
	readonly imageHasError = signal<boolean>(false);
	readonly dropdownIsOpen = signal<boolean>(false);
	readonly isLoggingOut = signal<boolean>(false);

	readonly avatarPath = computed(() => {
		const avatar = this.avatar();
		return avatar ? `/server${avatar}` : null;
	});

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

	onProfileClick() {
		this.router.navigate(['/profile', this.username()]);
		this.dropdownIsOpen.set(false);
	}

	onSettingsClick() {
		this.router.navigate(['/settings']);
		this.dropdownIsOpen.set(false);
	}

	onLogoutClick() {
		this.isLoggingOut.set(true);
		this.auth
			.logOut()
			.pipe(
				finalize(() => this.isLoggingOut.set(false)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.router.navigate(['/auth/login']);
			});
	}

	onImageError() {
		this.imageHasError.set(true);
	}
}
