import {
	Component,
	computed,
	effect,
	ElementRef,
	inject,
	OnInit,
	signal,
	ViewChild,
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '@features/auth';
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
	],
})
export class SettingsPageComponent {
	private readonly auth = inject(AuthService);

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	readonly usernameControl = new FormControl('', {nonNullable: true});
	readonly avatarControl = new FormControl<File | null>(null);
	readonly biographyControl = new FormControl('', {nonNullable: true});

	readonly user = this.auth.user;
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
				const {username, biography} = user;
				this.usernameControl.reset(username);
				this.biographyControl.reset(biography || '');
			}
		});
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
