import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Tag, Size, Variant, Weight} from './types';

@Component({
	selector: 'app-typography',
	templateUrl: './typography.component.html',
	imports: [CommonModule],
	standalone: true,
})
export class TypographyComponent {
	@Input() class: string = '';
	@Input() variant: Variant = 'body1';
	@Input() as?: Tag;
	@Input() size?: Size;
	@Input() weight?: Weight;

	get tag(): Tag {
		const variantToTagsMapping: Record<Variant, Tag> = {
			h1: 'h1',
			h2: 'h2',
			h3: 'h3',
			body1: 'p',
		};

		return this.as || variantToTagsMapping[this.variant];
	}

	get classes(): string {
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

		const baseClasses = 'text-text';

		const props = variantToPropsMapping[this.variant];

		const sizeClasses = sizeToClassesMapping[this.size || props.size];
		const weightClasses = weightToClassesMapping[this.weight || props.weight];

		return `${baseClasses} ${sizeClasses} ${weightClasses} ${this.class}`;
	}
}
