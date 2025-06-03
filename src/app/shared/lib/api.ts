export class Api {
	BASE_URL: string = '/server/api';
}

export interface PaginationResponse<T extends object> {
	content: T[];
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}
