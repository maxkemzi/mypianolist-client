import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export function authInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
) {
	const service = inject(AuthService);

	const token = service.getAuthToken();
	if (token) {
		return next(req.clone({setHeaders: {Authorization: token}}));
	}

	return next(req);
}
