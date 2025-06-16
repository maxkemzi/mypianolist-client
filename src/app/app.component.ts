import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';
import {ErrorHandlingService} from '@features/error-handling';
import {
	NotificationAlertsComponent,
	NotificationAlertService,
} from '@features/notification-alert';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NotificationAlertsComponent],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly notificationAlert = inject(NotificationAlertService);

	readonly title = 'mypianolist-frontend';

	// Injected just for its side effects - centralized error handling
	constructor(private readonly errorHandling: ErrorHandlingService) {}

	ngOnInit(): void {
		this.auth.refresh().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

		this.destroyRef.onDestroy(() => {
			this.notificationAlert.clearAll();
		});
	}
}
