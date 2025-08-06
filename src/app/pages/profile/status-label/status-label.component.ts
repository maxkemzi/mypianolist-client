import {Component, inject, input} from '@angular/core';
import {PieceStatusType, PieceUtils} from '@entities/piece';
import {twJoin} from 'tailwind-merge';

@Component({
	selector: 'app-status-label',
	templateUrl: './status-label.component.html',
})
export class StatusLabelComponent {
	private readonly pieceUtils = inject(PieceUtils);
	private readonly STATUS_TO_BEFORE_BG_CLASS_MAPPING: Record<
		PieceStatusType,
		string
	> = {
		currently_learning: 'before:bg-success',
		completed: 'before:bg-info',
		dropped: 'before:bg-error',
		plan_to_learn: 'before:bg-surface-lighter',
	};

	readonly status = input<PieceStatusType>();

	get label() {
		const status = this.status();
		return status ? this.pieceUtils.statusToText(status) : 'Total';
	}

	get classes() {
		const status = this.status();
		const bgColorClass = status
			? this.STATUS_TO_BEFORE_BG_CLASS_MAPPING[status]
			: 'before:bg-surface';

		return twJoin(
			'relative pl-6 before:absolute before:block before:w-4 before:h-4 before:rounded-sm before:top-1/2 before:translate-y-[-50%] before:left-0',
			bgColorClass,
		);
	}
}
