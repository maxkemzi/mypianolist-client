import {Composer} from '@entities/composer';
import {Genre} from '@entities/genre';

export interface Piece {
	id: string;
	title: string;
	description: string;
	image: string | null;
	composedAt: string;
	genre: Genre;
	composer: Composer;
}

export interface CompletePiece extends Piece {
	favorites: number;
	learners: number;
	inFavorites?: boolean;
	status?: PieceStatusType;
}

export const PieceStatus = {
	CURRENTLY_LEARNING: 'currently_learning',
	COMPLETED: 'completed',
	DROPPED: 'dropped',
	PLAN_TO_LEARN: 'plan_to_learn',
} as const;

export type PieceStatusType = (typeof PieceStatus)[keyof typeof PieceStatus];

export interface UserPiece extends Piece {
	score: number | null;
	status: PieceStatusType;
	startedAt: string;
	finishedAt: string;
}

export type PieceSort = 'created_at' | 'learners' | 'favorites';

export type UserPieceSort = 'created_at' | 'score';
