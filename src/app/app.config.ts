import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import {routes} from './app.routes';
import {authInterceptor, AuthService} from './features/auth';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAppInitializer(() => {
			const authService = inject(AuthService);
			return authService.initAuth();
		}),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withInterceptors([authInterceptor])),
	],
};
