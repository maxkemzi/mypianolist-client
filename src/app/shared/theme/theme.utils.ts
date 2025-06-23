import {Injectable} from '@angular/core';
import {ThemeColor, ThemeColorType} from './types';

@Injectable({providedIn: 'root'})
export class ThemeUtils {
	private readonly COLOR_TO_BG_CLASS_MAPPING: Record<ThemeColorType, string> =
		{
			[ThemeColor.PRIMARY]: 'bg-primary',
			[ThemeColor.SECONDARY]: 'bg-secondary',
			[ThemeColor.BACKGROUND]: 'bg-background',
			[ThemeColor.BACKGROUND_DARKER]: 'bg-background-darker',
			[ThemeColor.SURFACE]: 'bg-surface',
			[ThemeColor.SURFACE_LIGHTER]: 'bg-surface-lighter',
			[ThemeColor.TEXT]: 'bg-text',
			[ThemeColor.SUCCESS]: 'bg-success',
			[ThemeColor.INFO]: 'bg-info',
			[ThemeColor.ERROR]: 'bg-error',
			[ThemeColor.WARNING]: 'bg-warning',
			[ThemeColor.DISABLED]: 'bg-disabled',
		};

	private readonly COLOR_TO_TEXT_CLASS_MAPPING: Record<
		ThemeColorType,
		string
	> = {
		[ThemeColor.PRIMARY]: 'text-primary',
		[ThemeColor.SECONDARY]: 'text-secondary',
		[ThemeColor.BACKGROUND]: 'text-background',
		[ThemeColor.BACKGROUND_DARKER]: 'text-background-darker',
		[ThemeColor.SURFACE]: 'text-surface',
		[ThemeColor.SURFACE_LIGHTER]: 'text-surface-lighter',
		[ThemeColor.TEXT]: 'text-text',
		[ThemeColor.SUCCESS]: 'text-success',
		[ThemeColor.INFO]: 'text-info',
		[ThemeColor.ERROR]: 'text-error',
		[ThemeColor.WARNING]: 'text-warning',
		[ThemeColor.DISABLED]: 'text-disabled',
	};

	colorToBgClass(color: ThemeColorType): string {
		return this.COLOR_TO_BG_CLASS_MAPPING[color];
	}

	colorToTextClass(color: ThemeColorType): string {
		return this.COLOR_TO_TEXT_CLASS_MAPPING[color];
	}
}
