import {
	Directive,
	ElementRef,
	HostListener,
	inject,
	output,
} from '@angular/core';

@Directive({
	selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
	private readonly el = inject(ElementRef);

	appClickOutside = output<MouseEvent>();

	@HostListener('document:click', ['$event', '$event.target'])
	public onClick(event: MouseEvent, targetEl: HTMLElement): void {
		if (!targetEl) {
			return;
		}

		const clickedInside = this.el.nativeElement.contains(targetEl);
		if (!clickedInside) {
			this.appClickOutside.emit(event);
		}
	}
}
