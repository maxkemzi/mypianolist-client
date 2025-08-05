import {Injectable} from '@angular/core';
import {ThemeColorType} from '@shared/theme/types';
import {PieceStatus, PieceStatusType} from './piece.model';

@Injectable({providedIn: 'root'})
export class PieceUtils {
	statusToText(status: PieceStatusType): string {
		const STATUS_TO_TEXT_MAPPING: Record<PieceStatusType, string> = {
			[PieceStatus.CURRENTLY_LEARNING]: 'Learning',
			[PieceStatus.COMPLETED]: 'Completed',
			[PieceStatus.DROPPED]: 'Dropped',
			[PieceStatus.PLAN_TO_LEARN]: 'Plan to Learn',
		};
		return STATUS_TO_TEXT_MAPPING[status];
	}

	statusToColor(status: PieceStatusType): ThemeColorType {
		const STATUS_TO_COLOR_MAPPING: Record<PieceStatusType, ThemeColorType> = {
			[PieceStatus.CURRENTLY_LEARNING]: 'success',
			[PieceStatus.COMPLETED]: 'info',
			[PieceStatus.DROPPED]: 'error',
			[PieceStatus.PLAN_TO_LEARN]: 'surfaceLighter',
		};
		return STATUS_TO_COLOR_MAPPING[status];
	}
}
