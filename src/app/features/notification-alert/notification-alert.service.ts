import {Injectable, signal} from '@angular/core';
import {nanoid} from 'nanoid';
import {
	NotificationAlertItem,
	NotificationAlertStatus,
} from './notification-alert.model';

@Injectable({providedIn: 'root'})
export class NotificationAlertService {
	private readonly _items = signal<NotificationAlertItem[]>([]);
	private timeouts = new Map<string, NodeJS.Timeout>();

	readonly items = this._items.asReadonly();

	showError(message: string): string {
		return this.show('error', message);
	}

	showSuccess(message: string): string {
		return this.show('success', message);
	}

	showWarning(message: string): string {
		return this.show('warning', message);
	}

	showInfo(message: string): string {
		return this.show('info', message);
	}

	private show(status: NotificationAlertStatus, message: string): string {
		const id = nanoid();
		this._items.update(prev => [...prev, {id, status, message}]);

		const timeout = setTimeout(() => {
			this.hide(id);
		}, 2000);

		this.timeouts.set(id, timeout);
		return id;
	}

	hide(id: string) {
		this._items.update(prev => prev.filter(i => i.id !== id));

		const timeout = this.timeouts.get(id);
		if (timeout) {
			clearTimeout(timeout);
			this.timeouts.delete(id);
		}
	}

	clearAll() {
		for (const timeout of this.timeouts.values()) {
			clearTimeout(timeout);
		}
		this.timeouts.clear();
		this._items.set([]);
	}
}
