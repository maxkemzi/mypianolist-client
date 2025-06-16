import {Component, HostBinding, inject, input} from '@angular/core';
import {NotificationAlertItem} from '@features/notification-alert/notification-alert.model';
import {NotificationAlertService} from '@features/notification-alert/notification-alert.service';
import {TypographyComponent} from '@shared/components';
import {TypographyColor} from '@shared/components/typography';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'app-notification-alert',
	templateUrl: './notification-alert.component.html',
	imports: [TypographyComponent],
})
export class NotificationAlertComponent {
	private readonly service = inject(NotificationAlertService);

	readonly alert = input.required<NotificationAlertItem>();

	@HostBinding('class')
	get classes() {
		const {status} = this.alert();
		return twJoin(
			'w-62 flex items-center justify-between gap-3 p-4 rounded-lg bg-background shadow-lg border-1 border-surface border-t-2 overflow-hidden',
			status === 'error' && 'border-t-error',
			status === 'success' && 'border-t-success',
			status === 'warning' && 'border-t-warning',
			status === 'info' && 'border-t-info',
		);
	}

	get typographyColor(): TypographyColor {
		const {status} = this.alert();

		if (status === 'error') {
			return 'error';
		}
		if (status === 'success') {
			return 'success';
		}
		if (status === 'warning') {
			return 'warning';
		}

		return 'info';
	}

	get iconClasses() {
		const {status} = this.alert();
		return twJoin(
			'ph-bold',
			status === 'error' && 'ph-x',
			status === 'success' && 'ph-check',
			status === 'warning' && 'ph-exclamation-mark',
			status === 'info' && 'ph-question-mark',
		);
	}

	onClose() {
		this.service.hide(this.alert().id);
	}
}
