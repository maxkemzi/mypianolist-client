import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

type GetArgs = Parameters<HttpClient['get']>;
type GetArgsWithoutUrl = GetArgs extends [any, ...infer Rest] ? Rest : never;

type PostArgs = Parameters<HttpClient['post']>;
type PostArgsWithoutUrl = PostArgs extends [any, ...infer Rest] ? Rest : never;

type DeleteArgs = Parameters<HttpClient['delete']>;
type DeleteArgsWithoutUrl = DeleteArgs extends [any, ...infer Rest]
	? Rest
	: never;

@Injectable({providedIn: 'root'})
export class Api {
	private readonly http = inject(HttpClient);
	private readonly BASE_URL = '/server/api';

	get<T>(url: string, ...restArgs: GetArgsWithoutUrl) {
		return this.http.get<T>(this.getFullUrl(url), ...restArgs);
	}

	post<T>(url: string, ...restArgs: PostArgsWithoutUrl) {
		return this.http.post<T>(this.getFullUrl(url), ...restArgs);
	}

	patch<T>(url: string, ...restArgs: PostArgsWithoutUrl) {
		return this.http.patch<T>(this.getFullUrl(url), ...restArgs);
	}

	delete(url: string, ...restArgs: DeleteArgsWithoutUrl) {
		return this.http.delete(this.getFullUrl(url), ...restArgs);
	}

	private getFullUrl(url: string) {
		return `${this.BASE_URL}${url}`;
	}
}

export interface PaginationResponse<T extends object> {
	content: T[];
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}

export interface ApiError<C extends string = string> {
	message: string;
	code: C;
}
