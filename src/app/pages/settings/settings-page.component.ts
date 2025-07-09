import {
	Component,
	computed,
	DestroyRef,
	effect,
	ElementRef,
	inject,
	signal,
	ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import {AuthService} from '@features/auth';
import {UpdateUsernameService} from '@features/user/update-username';
import {
	ButtonComponent,
	ContainerComponent,
	FormFieldComponent,
	InputComponent,
	TypographyComponent,
} from '@shared/components';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		FormFieldComponent,
		InputComponent,
		ButtonComponent,
		ReactiveFormsModule,
		FormsModule,
	],
})
export class SettingsPageComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly auth = inject(AuthService);
	private readonly updateUsername = inject(UpdateUsernameService);

	readonly user = this.auth.user;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	readonly usernameControl = new FormControl('', {
		validators: [
			Validators.required,
			this.usernameNotSameValidator(this.user()?.username),
		],
		nonNullable: true,
	});
	readonly avatarControl = new FormControl<File | null>(null);
	readonly biographyControl = new FormControl('', {nonNullable: true});

	readonly usernameIsUpdating = this.updateUsername.isLoading;
	readonly uploadedAvatar = signal<string | undefined>(undefined);
	readonly avatar = computed(() => {
		if (this.uploadedAvatar()) {
			return this.uploadedAvatar();
		}

		const avatar = this.user()?.avatar;
		if (avatar) {
			return `/server/${avatar}`;
		}

		return '/images/avatar.jpg';
	});

	constructor() {
		effect(() => {
			const user = this.user();
			if (user) {
				this.usernameControl.reset(user.username);
				this.biographyControl.reset(user.biography || '');
			}
		});
	}

	usernameNotSameValidator(current?: string) {
		return (control: AbstractControl): ValidationErrors | null => {
			return current && control.value !== current
				? null
				: {usernameNotSame: true};
		};
	}

	get usernameError(): string | undefined {
		if (this.usernameControl?.touched) {
			if (this.usernameControl?.errors?.['required']) {
				return 'Username is required.';
			}
			if (this.usernameControl?.errors?.['usernameNotSame']) {
				return 'Username must be different from the current one.';
			}
		}

		return undefined;
	}

	onUsernameSubmit() {
		this.usernameControl.markAsTouched();

		if (this.usernameControl.invalid) {
			return;
		}

		this.updateUsername
			.update(this.usernameControl.value)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	openFilePicker() {
		this.fileInput.nativeElement.click();
	}

	uploadAvatar(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files) {
			return;
		}

		const file = target.files[0];

		const objectUrl = URL.createObjectURL(file);
		this.uploadedAvatar.set(objectUrl);

		this.avatarControl.setValue(file);
	}

	resetAvatar() {
		this.uploadedAvatar.set(undefined);
		this.avatarControl.setValue(null);
	}
}
