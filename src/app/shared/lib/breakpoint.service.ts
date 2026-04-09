import {BreakpointObserver} from '@angular/cdk/layout';
import {inject, Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreakpointService {
	private readonly breakpointObserver = inject(BreakpointObserver);

	readonly maxXs = this.createSignal('(max-width: 480px)');
	readonly maxSm = this.createSignal('(max-width: 640px)');
	readonly maxMd = this.createSignal('(max-width: 768px)');
	readonly maxLg = this.createSignal('(max-width: 1024px)');
	readonly maxXl = this.createSignal('(max-width: 1280px)');

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
