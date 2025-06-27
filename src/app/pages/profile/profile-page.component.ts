import {Component, inject, input, OnInit} from '@angular/core';
import {FetchPieceStatsService} from '@features/piece/fetchStats';
import {FetchUserProfileService} from '@features/user/profile/fetch';
import {
	ButtonComponent,
	ContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {StatusLabelComponent} from './components/status-label/status-label.component';
import {FetchFavoritePiecesService} from '@features/piece/fetchFavorite';
import {FavoritePieceCardComponent} from '@entities/piece';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	imports: [
		ContainerComponent,
		TypographyComponent,
		ButtonComponent,
		StatusLabelComponent,
		FavoritePieceCardComponent,
		RouterLink,
	],
})
export class ProfilePageComponent implements OnInit {
	private readonly fetchUserProfile = inject(FetchUserProfileService);
	private readonly fetchPieceStats = inject(FetchPieceStatsService);
	private readonly fetchFavoritePieces = inject(FetchFavoritePiecesService);

	readonly username = input<string>();
	readonly profile = {
		data: this.fetchUserProfile.data,
		isLoading: this.fetchUserProfile.isLoading,
		hasError: this.fetchUserProfile.hasError,
	};
	readonly stats = {
		data: this.fetchPieceStats.data,
		isLoading: this.fetchPieceStats.isLoading,
		hasError: this.fetchPieceStats.hasError,
	};
	readonly pieces = {
		data: this.fetchFavoritePieces.data,
		isLoading: this.fetchFavoritePieces.isLoading,
		hasError: this.fetchFavoritePieces.hasError,
	};

	ngOnInit(): void {
		if (!this.username()) {
			this.fetchUserProfile.fetchWithAuth().subscribe();
			this.fetchPieceStats.fetchWithAuth().subscribe();
			this.fetchFavoritePieces.fetchWithAuth().subscribe();
		}
	}

	formatJoinedAt(joinedAt: string) {
		const date = new Date(joinedAt);
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		}).format(date);
	}
}
