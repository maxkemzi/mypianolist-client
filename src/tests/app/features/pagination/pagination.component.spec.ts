import {provideExperimentalZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaginationComponent} from '@features/pagination';

describe('PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PaginationComponent],
			providers: [provideExperimentalZonelessChangeDetection()],
		});
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
	});

	const setInputs = (page: number, totalPages: number) => {
		fixture.componentRef.setInput('page', page);
		fixture.componentRef.setInput('totalPages', totalPages);
		fixture.detectChanges();
	};

	it('should show all pages when totalPages <= 5', () => {
		setInputs(2, 4);
		expect(component.pages).toEqual([0, 1, 2, 3]);
	});

	it('should show start range when page < 3 and totalPages > 5', () => {
		setInputs(1, 10);
		expect(component.pages).toEqual([0, 1, 2, '...', 9]);
	});

	it('should show end range when page near the end', () => {
		setInputs(8, 10);
		expect(component.pages).toEqual([0, '...', 7, 8, 9]);
	});

	it('should show middle range when page is in the middle', () => {
		setInputs(5, 10);
		expect(component.pages).toEqual([0, '...', 4, 5, 6, '...', 9]);
	});

	it('should emit next page if not on last page', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(1, 5);

		component.nextPage();
		expect(spy).toHaveBeenCalledWith(2);
	});

	it('should not emit next page if on last page', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(4, 5);

		component.nextPage();
		expect(spy).not.toHaveBeenCalled();
	});

	it('should emit previous page if not on first page', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(3, 5);

		component.prevPage();
		expect(spy).toHaveBeenCalledWith(2);
	});

	it('should not emit previous page if on first page', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(0, 5);

		component.prevPage();
		expect(spy).not.toHaveBeenCalled();
	});

	it('should emit on goToPage if different from current', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(2, 5);

		component.goToPage(3);
		expect(spy).toHaveBeenCalledWith(3);
	});

	it('should not emit on goToPage if same as current', () => {
		const spy = jasmine.createSpy('emit');
		component.appPageChange = {emit: spy} as any;
		setInputs(2, 5);

		component.goToPage(2);
		expect(spy).not.toHaveBeenCalled();
	});

	it('getPageLabel should return page + 1 if number', () => {
		expect(component.getPageLabel(2)).toBe('3');
	});

	it('getPageLabel should return the string if "..."', () => {
		expect(component.getPageLabel('...')).toBe('...');
	});
});
