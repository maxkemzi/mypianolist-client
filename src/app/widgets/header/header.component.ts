import {booleanAttribute, Component, input} from '@angular/core';
import {ContainerComponent} from '@shared/components';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	imports: [ContainerComponent],
})
export class HeaderComponent {
	readonly absolute = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	get classes() {
		return twJoin(
			'h-[88px] py-6 bg-background z-20',
			this.absolute() && 'absolute top-0 left-0 w-full',
		);
	}
}
