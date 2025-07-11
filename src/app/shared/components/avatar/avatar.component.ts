import {
	Component,
	HostBinding,
	HostListener,
	input,
	signal,
} from '@angular/core';
import {ClassMergeDirective} from '@shared/lib';

@Component({
	selector: 'img[appAvatar]',
	template: '',
})
export class AvatarComponent extends ClassMergeDirective {
	private readonly DEFAULT_SIZE = 50;

	readonly src = input<string>();
	readonly size = input<string | number>(this.DEFAULT_SIZE);
	readonly hasError = signal<boolean>(false);

	protected override defaultClass(): string {
		return 'block object-cover object-center rounded-lg';
	}

	@HostListener('error')
	onError() {
		this.hasError.set(true);
	}

	@HostBinding('attr.src')
	get finalSrc() {
		return this.hasError() ? '/images/avatar-fallback.svg' : this.src();
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
