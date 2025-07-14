import {
	Component,
	computed,
	DestroyRef,
	ElementRef,
	inject,
	input,
	model,
	signal,
	ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateAvatarService} from '@features/user/profile/update-avatar';
import {ButtonComponent} from '@shared/components';

@Component({
	selector: 'app-avatar-form',
	templateUrl: './avatar-form.component.html',
	imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
})
export class AvatarFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly updateAvatar = inject(UpdateAvatarService);

	readonly defaultAvatar = model.required<string | null>();
	readonly username = input.required<string>();

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	readonly control = new FormControl<File | null>(null);

	readonly previewPath = signal<string | undefined>(undefined);
	readonly imagePath = computed(() => {
		if (this.previewPath()) {
			return this.previewPath();
		}

		if (this.defaultAvatar()) {
			return `/server/${this.defaultAvatar()}`;
		}

		return '/images/avatar.jpg';
	});

	onSubmit() {
		const value = this.control.value;
		if (value === null) {
			return;
		}

		this.updateAvatar
			.update(value)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({avatar}) => {
				this.defaultAvatar.set(avatar);
				this.reset();
			});
	}

	get submitButtonIsDisabled() {
		return this.control.value === null || this.updateAvatar.isLoading();
	}

	openFilePicker() {
		this.fileInput.nativeElement.click();
	}

	upload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files) {
			return;
		}

		const file = target.files[0];

		const objectUrl = URL.createObjectURL(file);
		this.previewPath.set(objectUrl);

		this.control.setValue(file);

		// Reset file input value to be able to select the same file in a row
		this.fileInput.nativeElement.value = '';
	}

	reset() {
		this.previewPath.set(undefined);
		this.control.reset();
	}
}
