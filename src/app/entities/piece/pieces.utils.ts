import {Injectable} from '@angular/core';
import {PieceStatus} from './piece.model';

@Injectable({providedIn: 'root'})
export class PiecesUtils {
	statusToText(status: PieceStatus): string {
		switch (status) {
			case 'currently_learning':
				return 'Currently learning';
			case 'completed':
				return 'Completed';
			case 'dropped':
				return 'Dropped';
			case 'plan_to_learn':
				return 'Plan to learn';
		}
	}
}
