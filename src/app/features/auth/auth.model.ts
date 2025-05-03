export interface AuthUser {
	username: string;
	avatar: string | null;
}

export interface AuthTokens {
	access: string;
	refresh: string;
}
