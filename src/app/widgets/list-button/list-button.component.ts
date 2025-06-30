import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-list-button',
	templateUrl: './list-button.component.html',
	imports: [RouterLink],
})
export class ListButtonComponent {
	readonly username = input.required<string>();
}
