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
import {firstValueFrom} from 'rxjs';
import {routes} from './app.routes';
import {authInterceptor, AuthService} from '@features/auth';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideAppInitializer(() => {
			const auth = inject(AuthService);
			return firstValueFrom(auth.refresh());
		}),
	],
};
