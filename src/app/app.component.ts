import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';
import {
	NotificationAlertsComponent,
	NotificationAlertService,
} from '@features/notification-alert';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NotificationAlertsComponent],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
	private readonly auth = inject(AuthService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly notificationAlert = inject(NotificationAlertService);

	readonly title = 'mypianolist-frontend';

	ngOnInit(): void {
		this.auth.refresh().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}

	ngOnDestroy(): void {
		this.notificationAlert.clearAll();
	}
}
