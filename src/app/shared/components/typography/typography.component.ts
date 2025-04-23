import {CommonModule} from '@angular/common';
import {Component, input} from '@angular/core';
import {Tag, Size, Variant, Weight, Color} from './types';
import {twMerge} from 'tailwind-merge';

@Component({
	selector: 'app-typography',
	templateUrl: './typography.component.html',
	imports: [CommonModule],
})
export class TypographyComponent {
	readonly variant = input<Variant>('body1');
	readonly color = input<Color>('text');
	readonly class = input<string>();
	readonly as = input<Tag>();
	readonly size = input<Size>();
	readonly weight = input<Weight>();

	get tag(): Tag {
		const variantToTagsMapping: Record<Variant, Tag> = {
			h1: 'h1',
			h2: 'h2',
			h3: 'h3',
			body1: 'p',
			body2: 'p',
		};

		return this.as() || variantToTagsMapping[this.variant()];
	}

	get classes(): string {
		const colorToClassesMapping: Record<Color, string> = {
			text: 'text-text',
			primary: 'text-primary',
			danger: 'text-danger',
		};

		const sizeToClassesMapping: Record<Size, string> = {
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			'4xl': 'text-4xl',
			'5xl': 'text-5xl',
		};

		const weightToClassesMapping: Record<Weight, string> = {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		};

		const variantToPropsMapping: Record<
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
				size: 'lg',
				weight: 'medium',
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

		const props = variantToPropsMapping[this.variant()];

		const colorClasses = colorToClassesMapping[this.color() || 'text'];
		const sizeClasses = sizeToClassesMapping[this.size() || props.size];
		const weightClasses =
			weightToClassesMapping[this.weight() || props.weight];

		return twMerge(colorClasses, sizeClasses, weightClasses, this.class());
	}
}
