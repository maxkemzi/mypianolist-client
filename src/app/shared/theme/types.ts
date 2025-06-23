const ThemeColor = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	BACKGROUND: 'background',
	BACKGROUND_DARKER: 'backgroundDarker',
	SURFACE: 'surface',
	SURFACE_LIGHTER: 'surfaceLighter',
	TEXT: 'text',
	SUCCESS: 'success',
	INFO: 'info',
	ERROR: 'error',
	WARNING: 'warning',
	DISABLED: 'disabled',
} as const;

type ThemeColorType = (typeof ThemeColor)[keyof typeof ThemeColor];

export {ThemeColor, type ThemeColorType};
