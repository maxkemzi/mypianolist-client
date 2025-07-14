import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FetchUserProfileService} from '@features/user/profile/fetch';
import {ContainerComponent, TypographyComponent} from '@shared/components';
import {AvatarFormComponent} from './avatar-form/avatar-form.component';
import {BiographyFormComponent} from './biography-form/biography-form.component';
import {UsernameFormComponent} from './username-form/username-form.component';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		ReactiveFormsModule,
		FormsModule,
		UsernameFormComponent,
		BiographyFormComponent,
		AvatarFormComponent,
	],
})
export class SettingsPageComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly fetchProfile = inject(FetchUserProfileService);

	readonly profile = {
		data: this.fetchProfile.data,
		isLoading: this.fetchProfile.isLoading,
	};

	ngOnInit(): void {
		this.fetchProfile
			.fetchByAuth()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
