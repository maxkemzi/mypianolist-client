export type NotificationAlertStatus = 'error' | 'success' | 'warning' | 'info';
export interface NotificationAlertItem {
	id: string;
	status: NotificationAlertStatus;
	message: string;
}
