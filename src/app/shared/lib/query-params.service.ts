import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class QueryParamsService {
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	merge(params: Params) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}
}
