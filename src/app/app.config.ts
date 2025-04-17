import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient} from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import {routes} from './app.routes';
import {AuthService} from './features/auth/auth.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAppInitializer(() => {
			const authService = inject(AuthService);
			return authService.initAuth();
		}),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(),
	],
};
