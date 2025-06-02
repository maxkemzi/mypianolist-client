import {booleanAttribute, Component, input} from '@angular/core';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
})
export class TabComponent {
	isActive = input<boolean, unknown>(false, {transform: booleanAttribute});
}
