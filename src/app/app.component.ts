import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '@features/auth';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CommonModule],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	private readonly auth = inject(AuthService);
	title = 'mypianolist-frontend';

	ngOnInit(): void {
		this.auth.refresh().subscribe();
	}
}
