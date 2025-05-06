import {Component, input} from '@angular/core';
import {TypographyComponent} from '../typography';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'app-info-item',
	templateUrl: './info-item.component.html',
	imports: [TypographyComponent],
})
export class InfoItemComponent extends ClassMergeDirective {
	readonly title = input.required<string>();
	readonly value = input.required<string>();

	protected override defaultClass(): string {
		return '';
	}
}
