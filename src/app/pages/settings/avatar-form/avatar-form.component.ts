import {
	Component,
	computed,
	DestroyRef,
	effect,
	ElementRef,
	inject,
	input,
	model,
	signal,
	ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {DeleteAvatarService} from '@features/user/profile/delete-avatar';
import {UpdateAvatarService} from '@features/user/profile/update-avatar';
import {
	AvatarComponent,
	ButtonComponent,
	FormFieldComponent,
} from '@shared/components';
import {defer, iif} from 'rxjs';

@Component({
	selector: 'app-avatar-form',
	templateUrl: './avatar-form.component.html',
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonComponent,
		AvatarComponent,
		FormFieldComponent,
	],
})
export class AvatarFormComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly updateAvatar = inject(UpdateAvatarService);
	private readonly deleteAvatar = inject(DeleteAvatarService);

	readonly defaultAvatar = model.required<string | null>();
	readonly username = input.required<string>();

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	readonly control = new FormControl<File | null | undefined>(
		{value: undefined, disabled: false},
		{validators: [this.avatarIsRequiredValidator], nonNullable: true},
	);

	readonly isLoading = computed(
		() => this.updateAvatar.isLoading() || this.deleteAvatar.isLoading(),
	);
	readonly previewPath = signal<string | null | undefined>(undefined);
	readonly imagePath = computed(() => {
		if (this.previewPath() !== undefined) {
			return this.previewPath();
		}

		if (this.defaultAvatar()) {
			return `/server/${this.defaultAvatar()}`;
		}

		return null;
	});

	avatarIsRequiredValidator(control: AbstractControl) {
		return control.value === undefined ? {required: true} : null;
	}

	get error() {
		const error = this.updateAvatar.error();
		if (error?.code === 'max_upload_size_exceeded') {
			return 'Your picture is too big, make it smaller than 500Kb.';
		}

		if (this.control.touched) {
			if (this.control.errors?.['required']) {
				return 'You did not provide a picture to upload.';
			}
		}

		return null;
	}

	get submitButtonIsDisabled() {
		return this.updateAvatar.isLoading();
	}

	onSubmit() {
		const value = this.control.value;
		if (value === undefined) {
			this.control.markAsTouched();
			return;
		}

		const deleteOrUpdateAvatar = iif(
			() => value === null,
			this.deleteAvatar.delete(),
			this.updateAvatar.update(value!),
		);

		deleteOrUpdateAvatar
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(({avatar}) => {
				this.defaultAvatar.set(avatar);
				this.reset();
			});
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

	remove() {
		if (this.defaultAvatar() !== null) {
			this.previewPath.set(null);
			this.control.setValue(null);
		}
	}
}
