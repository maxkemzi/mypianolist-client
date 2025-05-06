import {inject} from '@angular/core';
import {Routes} from '@angular/router';
import {AuthService} from '@features/auth';
import {authGuard} from '@shared/lib';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('@core/layouts').then(m => m.BaseLayoutComponent),
		children: [
			{
				path: '',
				loadComponent: () =>
					import('@pages').then(m => m.HomePageComponent),
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
