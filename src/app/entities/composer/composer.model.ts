export interface Composer {
	id: string;
	firstName: string;
	lastName: string;
	nickname: string | null;
	biography: string;
	image: string | null;
	bornAt: string;
	diedAt: string | null;
}

export interface CompleteComposer extends Composer {
	favorites: number;
	inFavorites?: boolean;
}
