import {Component, input, output} from '@angular/core';
import {ButtonComponent} from '../button';
import {ModalComponent} from '../modal';
import {TypographyComponent} from '../typography';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	imports: [TypographyComponent, ButtonComponent, ModalComponent],
})
export class AlertComponent {
	readonly title = input.required<string>();
	readonly confirmIsDisabled = input<boolean>();
	readonly appCancel = output<void>();
	readonly appConfirm = output<void>();

	onCancel() {
		this.appCancel.emit();
	}

	onConfirm() {
		this.appConfirm.emit();
	}
}
