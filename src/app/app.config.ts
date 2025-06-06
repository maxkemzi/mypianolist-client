import {
	ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import {authInterceptor} from '@features/auth';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withInterceptors([authInterceptor])),
	],
};
