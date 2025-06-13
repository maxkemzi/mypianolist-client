import {
	Component,
	computed,
	DestroyRef,
	forwardRef,
	inject,
	Injectable,
	OnInit,
	signal,
} from '@angular/core';
import {FetchPieceStatusesService} from '../../fetch-piece-statuses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PieceStatusType, PieceUtils} from '@entities/piece';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
	DropdownComponent,
	DropdownItemComponent,
	InputComponent,
} from '@shared/components';
import {ClickOutsideDirective} from '@shared/lib';

@Component({
	selector: 'app-piece-statuses-select',
	templateUrl: './piece-statuses-select.component.html',
	imports: [
		DropdownComponent,
		DropdownItemComponent,
		InputComponent,
		ClickOutsideDirective,
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => PieceStatusesSelect),
		},
	],
})
export class PieceStatusesSelect implements OnInit, ControlValueAccessor {
	private readonly service = inject(FetchPieceStatusesService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly pieceUtils = inject(PieceUtils);

	readonly value = signal<PieceStatusType | ''>('');
	readonly touched = signal<boolean>(false);
	readonly disabled = signal<boolean>(false);
	readonly isOpen = signal<boolean>(false);
	readonly valueLabel = computed(() => {
		const value = this.value();
		return value ? this.statusToText(value) : value;
	});

	readonly statuses = {
		data: this.service.data.asReadonly(),
		isLoading: this.service.isLoading.asReadonly(),
		hasError: this.service.hasError.asReadonly(),
	};
	readonly statusToText = this.pieceUtils.statusToText;

	ngOnInit(): void {
		this.service
			.fetch()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	onChange(value: PieceStatusType | '') {}
	onTouched() {}

	writeValue(value: PieceStatusType): void {
		this.value.set(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	markAsTouched() {
		if (!this.touched()) {
			this.onTouched();
			this.touched.set(true);
		}
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	onClickOutside() {
		this.isOpen.set(false);
	}

	onFocus() {
		this.isOpen.set(true);
	}

	onSelect(status: PieceStatusType) {
		this.value.set(status);
		this.onChange(this.value());

		this.isOpen.set(false);
	}
}
