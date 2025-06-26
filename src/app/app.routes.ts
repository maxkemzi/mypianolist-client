import {Routes} from '@angular/router';
import {BaseLayoutComponent} from '@core/layouts';
import {HomePageComponent} from '@pages';

export const routes: Routes = [
	{
		path: '',
		component: BaseLayoutComponent,
		children: [
			{
				path: '',
				component: HomePageComponent,
			},
			{
				path: 'catalog',
				loadComponent: () =>
					import('@pages').then(m => m.CatalogPageComponent),
			},

			{
				path: 'pieces',
				loadComponent: () =>
					import('@pages').then(m => m.PiecesPageComponent),
			},
			{
				path: 'pieces/:id',
				loadComponent: () =>
					import('@pages').then(m => m.PiecePageComponent),
			},
			{
				path: 'composers/:id',
				loadComponent: () =>
					import('@pages').then(m => m.ComposerPageComponent),
			},
			{
				path: 'list',
				loadComponent: () =>
					import('@pages').then(m => m.ListPageComponent),
			},
			{
				path: 'profile',
				loadComponent: () =>
					import('@pages').then(m => m.ProfilePageComponent),
			},
		],
	},
	{
		path: '',
		loadComponent: () =>
			import('@core/layouts').then(m => m.LogoOnlyLayoutComponent),
		children: [
			{
				path: 'auth',
				loadComponent: () =>
					import('@pages').then(m => m.AuthPageComponent),
				children: [
					{
						path: 'login',
						loadComponent: () =>
							import('@features/auth').then(m => m.LoginFormComponent),
					},
					{
						path: 'signup',
						loadComponent: () =>
							import('@features/auth').then(m => m.SignupFormComponent),
					},
				],
			},
		],
	},
];
