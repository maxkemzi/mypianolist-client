import {
	ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

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
		provideRouter(routes, withComponentInputBinding()),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withInterceptors([authInterceptor])),
	],
};
