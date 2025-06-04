import {booleanAttribute, Component, input} from '@angular/core';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	imports: [TypographyComponent],
})
export class TabComponent {
	isActive = input<boolean, unknown>(false, {transform: booleanAttribute});
}
