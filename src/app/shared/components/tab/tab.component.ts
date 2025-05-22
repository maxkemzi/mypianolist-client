import {booleanAttribute, Component, input, output} from '@angular/core';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
})
export class TabComponent {
	isActive = input<boolean, unknown>(false, {transform: booleanAttribute});
	onClick = output<void>();
}
