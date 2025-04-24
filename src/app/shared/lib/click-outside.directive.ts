import {Directive, ElementRef, HostListener, output} from '@angular/core';

@Directive({
	selector: '[clickOutside]',
})
export class ClickOutsideDirective {
	clickOutside = output<MouseEvent>();

	constructor(private _elementRef: ElementRef) {}

	@HostListener('document:click', ['$event', '$event.target'])
	public onClick(event: MouseEvent, targetElement: HTMLElement): void {
		if (!targetElement) {
			return;
		}

		const clickedInside =
			this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit(event);
		}
	}
}
