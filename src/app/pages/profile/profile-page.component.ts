import {
	Component,
	DestroyRef,
	inject,
	input,
	OnInit,
	signal,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {FavoriteComposerCardComponent} from '@entities/composer';
import {FavoritePieceCardComponent} from '@entities/piece';
import {AuthService} from '@features/auth';
import {FetchFavoriteComposersService} from '@features/composer/fetch-favorite';
import {FetchFavoritePiecesService} from '@features/piece/fetch-favorite';
import {FetchPieceStatsService} from '@features/piece/fetch-stats';
import {FetchUserProfileService} from '@features/user/profile/fetch';
import {
	AvatarComponent,
	ButtonComponent,
	ContainerComponent,
	TypographyComponent,
} from '@shared/components';
import {catchError, finalize, forkJoin, of} from 'rxjs';
import {StatusLabelComponent} from './components/status-label/status-label.component';

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
		FavoriteComposerCardComponent,
		AvatarComponent,
	],
})
export class ProfilePageComponent implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly fetchUserProfile = inject(FetchUserProfileService);
	private readonly fetchPieceStats = inject(FetchPieceStatsService);
	private readonly fetchFavoritePieces = inject(FetchFavoritePiecesService);
	private readonly fetchFavoriteComposers = inject(
		FetchFavoriteComposersService,
	);
	private readonly destroyRef = inject(DestroyRef);

	readonly username = input.required<string>();
	readonly isLoading = signal<boolean>(false);
	readonly hasError = signal<boolean>(false);
	readonly profile = {data: this.fetchUserProfile.data};
	readonly stats = {data: this.fetchPieceStats.data};
	readonly pieces = {data: this.fetchFavoritePieces.data};
	readonly composers = {data: this.fetchFavoriteComposers.data};

	ngOnInit(): void {
		this.isLoading.set(true);
		this.hasError.set(false);

		const user = this.auth.user();
		const username = this.username();
		let fetch =
			user && username === user.username
				? forkJoin([
						this.fetchUserProfile.fetchByAuth(),
						this.fetchPieceStats.fetchByAuth(),
						this.fetchFavoritePieces.fetchByAuth(),
						this.fetchFavoriteComposers.fetchByAuth(),
					])
				: forkJoin([
						this.fetchUserProfile.fetchByUsername(username),
						this.fetchPieceStats.fetchByUsername(username),
						this.fetchFavoritePieces.fetchByUsername(username),
						this.fetchFavoriteComposers.fetchByUsername(username),
					]);

		fetch
			.pipe(
				catchError(() => {
					this.hasError.set(true);
					return of();
				}),
				finalize(() => {
					this.isLoading.set(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
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
