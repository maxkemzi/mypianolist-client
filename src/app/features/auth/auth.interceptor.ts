import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export function authInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
) {
	const auth = inject(AuthService);

	const token = auth.getAccessToken();
	if (token) {
		return next(req.clone({setHeaders: {Authorization: `Bearer ${token}`}}));
	}

	return next(req);
}
