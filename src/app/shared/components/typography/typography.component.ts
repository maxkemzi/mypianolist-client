import {CommonModule} from '@angular/common';
import {
	Component,
	computed,
	ElementRef,
	HostBinding,
	inject,
	input,
} from '@angular/core';
import {twMerge} from 'tailwind-merge';
import {Color, Size, Tag, Variant, Weight} from './types';

@Component({
	selector: 'h1, h2, h3, h4, h5, h6, p, span, [appTypography]',
	templateUrl: './typography.component.html',
	imports: [CommonModule],
})
export class TypographyComponent {
	private readonly el = inject(ElementRef);
	readonly class = input<string>();
	readonly variant = input<Variant>();
	readonly color = input<Color>('text');
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

	@HostBinding('class')
	get classes(): string {
		const COLOR_TO_CLASSES_MAPPING: Record<Color, string> = {
			text: 'text-text',
			primary: 'text-primary',
			danger: 'text-danger',
		};

		const SIZE_TO_CLASSES_MAPPING: Record<Size, string> = {
			sm: 'text-sm',
			base: 'text-base',
			'2xl': 'text-2xl',
			'4xl': 'text-4xl',
			'5xl': 'text-5xl',
		};

		const WEIGHT_TO_CLASSES_MAPPING: Record<Weight, string> = {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		};

		const VARIANT_TO_PROPS_MAPPING: Record<
			Variant,
			{size: Size; weight: Weight}
		> = {
			body2: {
				size: 'sm',
				weight: 'normal',
			},
			body1: {
				size: 'base',
				weight: 'normal',
			},
			h3: {
				size: '2xl',
				weight: 'semibold',
			},
			h2: {
				size: '4xl',
				weight: 'semibold',
			},
			h1: {
				size: '5xl',
				weight: 'bold',
			},
		};

		const {size, weight} = VARIANT_TO_PROPS_MAPPING[this.finalVariant()];

		const colorClasses = COLOR_TO_CLASSES_MAPPING[this.color()];
		const sizeClasses = SIZE_TO_CLASSES_MAPPING[this.size() || size];
		const weightClasses = WEIGHT_TO_CLASSES_MAPPING[this.weight() || weight];

		return twMerge(colorClasses, sizeClasses, weightClasses, this.class());
	}
}
