import {Component, inject} from '@angular/core';
import {NotificationAlertService} from '@features/notification-alert/notification-alert.service';
import {NotificationAlertComponent} from '../notification-alert/notification-alert.component';

@Component({
	selector: 'app-notification-alerts',
	templateUrl: './notification-alerts.component.html',
	imports: [NotificationAlertComponent],
})
export class NotificationAlertsComponent {
	private readonly service = inject(NotificationAlertService);

	readonly items = this.service.items;
}
