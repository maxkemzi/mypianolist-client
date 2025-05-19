import {Directive, ElementRef, HostListener, output} from '@angular/core';

@Directive({
	selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
	appClickOutside = output<MouseEvent>();

	constructor(private _elementRef: ElementRef) {}

	@HostListener('document:click', ['$event', '$event.target'])
	public onClick(event: MouseEvent, targetElement: HTMLElement): void {
		if (!targetElement) {
			return;
		}

		const clickedInside =
			this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.appClickOutside.emit(event);
		}
	}
}
