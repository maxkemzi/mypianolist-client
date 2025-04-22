import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent, LogoComponent} from '@widgets';

@Component({
	selector: 'app-logo-only-layout',
	templateUrl: './logo-only-layout.component.html',
	imports: [RouterOutlet, HeaderComponent, LogoComponent],
})
export class LogoOnlyLayoutComponent {}
