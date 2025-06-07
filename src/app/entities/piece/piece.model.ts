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
}

export type PieceStatus =
	| 'currently_learning'
	| 'completed'
	| 'dropped'
	| 'plan_to_learn';

export interface UserPiece extends Piece {
	score: number | null;
	status: PieceStatus;
}

export type PieceSort = 'created_at' | 'learners' | 'favorites';
