import {Component, inject, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {ThemeColor, ThemeUtils} from '@shared/theme';
import {twJoin} from 'tailwind-merge';
import {
	TypographyColor,
	TypographyComponent,
	TypographySize,
} from '../typography';
import {Color, Size, Variant} from './types';

@Component({
	selector: 'button[appButton], a[appButton]',
	templateUrl: './button.component.html',
	imports: [TypographyComponent],
})
export class ButtonComponent extends ClassMergeDirective {
	private readonly themeUtils = inject(ThemeUtils);
	private readonly COLOR_TO_BG_CLASS_WITH_OPACITY_MAPPING: Record<
		Color,
		string
	> = {
		[ThemeColor.PRIMARY]: 'bg-primary/15',
		[ThemeColor.SECONDARY]: 'bg-secondary/15',
		[ThemeColor.BACKGROUND]: 'bg-background/15',
		[ThemeColor.BACKGROUND_DARKER]: 'bg-background-darker/15',
		[ThemeColor.SURFACE]: 'bg-surface/15',
		[ThemeColor.SURFACE_LIGHTER]: 'bg-surface-lighter/15',
		[ThemeColor.TEXT]: 'bg-text/15',
		[ThemeColor.SUCCESS]: 'bg-success/15',
		[ThemeColor.INFO]: 'bg-info/15',
		[ThemeColor.ERROR]: 'bg-error/15',
		[ThemeColor.WARNING]: 'bg-warning/15',
		[ThemeColor.DISABLED]: 'bg-disabled/15',
	};

	readonly variant = input<Variant>('primary');
	readonly size = input<Size>('md');
	readonly color = input<Color>('primary');

	protected override defaultClass(): string {
		const bgClass = this.themeUtils.colorToBgClass(this.color());
		const bgClassWithOpacity =
			this.COLOR_TO_BG_CLASS_WITH_OPACITY_MAPPING[this.color()];

		return twJoin(
			'block font-semibold rounded-lg text-center',
			this.size() === 'md' && 'py-2 px-7',
			this.size() === 'sm' && 'py-1.5 px-4',
			this.variant() === 'primary' && bgClass,
			this.variant() === 'outline' && bgClassWithOpacity,
		);
	}

	get textColor(): TypographyColor {
		if (this.variant() === 'outline') {
			return this.color();
		}

		return 'text';
	}

	get textSize(): TypographySize {
		if (this.size() === 'sm') {
			return 'sm';
		}

		return 'base';
	}
}
