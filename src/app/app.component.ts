import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly destroyRef = inject(DestroyRef);
	title = 'mypianolist-frontend';

	ngOnInit(): void {
		this.auth.refresh().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
	}
}
