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
			[ThemeColor.TEXT]: 'bg-text',
			[ThemeColor.SUCCESS]: 'bg-success',
			[ThemeColor.INFO]: 'bg-info',
			[ThemeColor.DANGER]: 'bg-danger',
			[ThemeColor.DISABLED]: 'bg-disabled',
		};

	colorToBgClass(color: ThemeColorType): string {
		return this.COLOR_TO_BG_CLASS_MAPPING[color];
	}
}
