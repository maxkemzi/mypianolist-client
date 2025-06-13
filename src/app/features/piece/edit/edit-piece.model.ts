import {PieceStatusType} from '@entities/piece';

export interface EditPiecePayload {
	status?: PieceStatusType;
	score?: number;
	startedAt?: string;
	finishedAt?: string;
}
