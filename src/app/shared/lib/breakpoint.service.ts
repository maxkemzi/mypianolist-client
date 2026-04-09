import {BreakpointObserver} from '@angular/cdk/layout';
import {inject, Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreakpointService {
	private readonly breakpointObserver = inject(BreakpointObserver);

	readonly sm = this.createSignal('(min-width: 640px)');
	readonly md = this.createSignal('(min-width: 768px)');
	readonly lg = this.createSignal('(min-width: 1024px)');
	readonly xl = this.createSignal('(min-width: 1280px)');

	private createSignal(query: string) {
		return toSignal(this.match(query), {
			initialValue: this.breakpointObserver.isMatched(query),
		});
	}

	private match(query: string) {
		return this.breakpointObserver
			.observe(query)
			.pipe(map(result => result.matches));
	}
}
