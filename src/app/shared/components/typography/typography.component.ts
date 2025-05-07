import {Component, computed, ElementRef, inject, input} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';
import {twJoin} from 'tailwind-merge';
import {Color, Size, Tag, Variant, Weight} from './types';

@Component({
	selector: 'h1, h2, h3, h4, h5, h6, p, span, [appTypography]',
	templateUrl: './typography.component.html',
	imports: [],
})
export class TypographyComponent extends ClassMergeDirective {
	private readonly el = inject(ElementRef);
	readonly variant = input<Variant>();
	readonly color = input<Color>();
	readonly size = input<Size>();
	readonly weight = input<Weight>();

	readonly finalVariant = computed(() => {
		const TAG_TO_VARIANT_MAPPING: Record<Tag, Variant> = {
			h1: 'h1',
			h2: 'h2',
			h3: 'h3',
			p: 'body1',
		};

		const tag = this.el.nativeElement.tagName.toLowerCase() as Tag;
		return this.variant() ?? TAG_TO_VARIANT_MAPPING[tag] ?? 'body1';
	});

	protected override defaultClass(): string {
		const COLOR_TO_CLASSES_MAPPING: Record<Color, string> = {
			inherit: 'text-inherit',
			text: 'text-text',
			primary: 'text-primary',
			danger: 'text-danger',
		};

		const SIZE_TO_CLASSES_MAPPING: Record<Size, string> = {
			inherit: 'text-[length:inherit]',
			sm: 'text-sm',
			base: 'text-base',
			'2xl': 'text-2xl',
			'4xl': 'text-4xl',
			'5xl': 'text-5xl',
		};

		const WEIGHT_TO_CLASSES_MAPPING: Record<Weight, string> = {
			inherit: 'font-[inherit]',
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		};

		const VARIANT_TO_PROPS_MAPPING: Record<
			Variant,
			{size: Size; color: Color; weight: Weight}
		> = {
			inherit: {
				size: 'inherit',
				color: 'inherit',
				weight: 'inherit',
			},
			body2: {
				size: 'sm',
				color: 'text',
				weight: 'normal',
			},
			body1: {
				size: 'base',
				color: 'text',
				weight: 'normal',
			},
			h3: {
				size: '2xl',
				color: 'text',
				weight: 'semibold',
			},
			h2: {
				size: '4xl',
				color: 'text',
				weight: 'semibold',
			},
			h1: {
				size: '5xl',
				color: 'text',
				weight: 'bold',
			},
		};

		const {size, color, weight} =
			VARIANT_TO_PROPS_MAPPING[this.finalVariant()];

		const colorClasses = COLOR_TO_CLASSES_MAPPING[this.color() || color];
		const sizeClasses = SIZE_TO_CLASSES_MAPPING[this.size() || size];
		const weightClasses = WEIGHT_TO_CLASSES_MAPPING[this.weight() || weight];

		return twJoin(colorClasses, sizeClasses, weightClasses);
	}
}
