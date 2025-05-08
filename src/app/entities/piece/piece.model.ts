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
	favorites: number;
	learners: number;
}
