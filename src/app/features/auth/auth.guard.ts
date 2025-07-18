import {isPlatformServer} from '@angular/common';
import {inject, Injector, PLATFORM_ID} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	createUrlTreeFromSnapshot,
} from '@angular/router';
import {first, map, skipWhile} from 'rxjs';
import {AuthService} from './auth.service';
import {RefreshAuthService} from './refresh';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const auth = inject(AuthService);
	const refreshAuth = inject(RefreshAuthService);
	const injector = inject(Injector);
	const platformId = inject(PLATFORM_ID);

	return toObservable(refreshAuth.isLoading, {injector}).pipe(
		skipWhile(isLoading => isLoading),
		map(() => {
			if (isPlatformServer(platformId)) {
				return false;
			}

			if (auth.isAuth()) {
				return true;
			}

			return createUrlTreeFromSnapshot(route, ['/auth/login']);
		}),
		first(),
	);
};
