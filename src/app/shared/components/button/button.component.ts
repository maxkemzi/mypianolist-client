import {
	booleanAttribute,
	Component,
	computed,
	ElementRef,
	HostBinding,
	inject,
	input,
} from '@angular/core';
import {BreakpointService, ClassMergeDirective} from '@shared/lib';
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
	private readonly themeUtils = inject(ThemeUtils);
	private readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly breakpoint = inject(BreakpointService);

	readonly type = input<'submit'>();
	readonly disabled = input<boolean, unknown>(false, {
		transform: booleanAttribute,
	});

	readonly variant = input<Variant>('primary');
	readonly size = input<Size>('md');
	readonly finalSize = computed<Size>(() => {
		const size = this.size();

		if (size === 'md' && this.breakpoint.maxSm()) {
			return 'sm';
		}

		return size;
	});
	readonly color = input<Color>();
	readonly finalColor = computed<Color>(() => {
		const color = this.color();
		if (color) {
			return color;
		}

		if (this.disabled()) {
			return 'disabled';
		}

		return 'primary';
	});

	protected override defaultClass(): string {
		const bgClass = this.themeUtils.colorToBgClass(this.finalColor());
		const bgClassWithOpacity =
			this.COLOR_TO_BG_CLASS_WITH_OPACITY_MAPPING[this.finalColor()];

		return twJoin(
			'block font-semibold rounded-lg text-center',
			this.finalSize() === 'md' && 'py-2 px-7',
			this.finalSize() === 'sm' && 'py-1.5 px-4',
			this.variant() === 'primary' && bgClass,
			this.variant() === 'outline' && bgClassWithOpacity,
		);
	}

	@HostBinding('attr.type')
	get finalType() {
		if (this.isLinkElement()) return null;

		return this.type() || 'button';
	}

	@HostBinding('attr.disabled')
	get finalDisabled() {
		if (this.isLinkElement()) return null;

		return this.disabled() ? '' : null;
	}

	private isLinkElement() {
		return this.elRef.nativeElement.tagName === 'A';
	}

	get textColor(): TypographyColor {
		if (this.variant() === 'outline') {
			return this.finalColor();
		}

		return 'text';
	}

	get textSize(): TypographySize {
		if (this.finalSize() === 'sm') {
			return 'sm';
		}

		return 'base';
	}
}
