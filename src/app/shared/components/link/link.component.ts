import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'a[appLink]',
	templateUrl: './link.component.html',
	imports: [CommonModule, TypographyComponent],
})
export class LinkComponent extends ClassMergeDirective {
	protected override defaultClass(): string {
		return 'border-b-1 border-transparent pb-0.5 hover:border-primary';
	}
}
