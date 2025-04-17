import {Component, Input} from '@angular/core';
import {TypographyComponent} from '../../shared/components';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	imports: [TypographyComponent],
	standalone: true,
})
export class ProfileComponent {
	@Input() username: string = 'username';
	@Input() avatar: string | null = null;
	imageHasError: boolean = false;

	get avatarSrc() {
		return `/images/${this.avatar}`;
	}

	handleImageError() {
		this.imageHasError = true;
	}
}
