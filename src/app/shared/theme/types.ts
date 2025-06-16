const ThemeColor = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	BACKGROUND: 'background',
	BACKGROUND_DARKER: 'backgroundDarker',
	SURFACE: 'surface',
	TEXT: 'text',
	SUCCESS: 'success',
	INFO: 'info',
	ERROR: 'error',
	DISABLED: 'disabled',
} as const;

type ThemeColorType = (typeof ThemeColor)[keyof typeof ThemeColor];

export {ThemeColor, type ThemeColorType};
