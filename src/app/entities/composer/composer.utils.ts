import {Injectable} from '@angular/core';
import {Composer} from './composer.model';

@Injectable({providedIn: 'root'})
export class ComposerUtils {
	getFullName(composer: Composer) {
		const {nickname, firstName, lastName} = composer;
		let result = `${firstName} ${lastName}`;

		if (nickname) {
			result += ` (${nickname})`;
		}

		return result;
	}

	getCompactName(composer: Composer) {
		const {nickname, firstName, lastName} = composer;
		return nickname ?? `${firstName.charAt(0)}. ${lastName}`;
	}
}
