import {
	Component,
	HostBinding,
	HostListener,
	input,
	signal,
} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'img[appAvatar]',
	template: '',
})
export class AvatarComponent extends ClassMergeDirective {
	private readonly DEFAULT_SIZE = 50;

	readonly src = input<string | null>();
	readonly size = input<string | number>(this.DEFAULT_SIZE);
	readonly hasError = signal<boolean>(false);

	constructor() {
		super();

		toObservable(this.src)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.hasError.set(false);
			});
	}

	protected override defaultClass(): string {
		return 'block object-cover object-center rounded-lg';
	}

	@HostListener('error')
	onError() {
		this.hasError.set(true);
	}

	@HostBinding('attr.src')
	get finalSrc() {
		const src = this.src();
		return src && !this.hasError() ? src : '/images/avatar-fallback.svg';
	}

	@HostBinding('style.width')
	get width() {
		return this.sizeInPx;
	}

	@HostBinding('style.height')
	get height() {
		return this.sizeInPx;
	}

	private get sizeInPx() {
		const size = Number.isNaN(Number(this.size()))
			? this.DEFAULT_SIZE
			: this.size();
		return `${size}px`;
	}
}
