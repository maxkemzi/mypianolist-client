import {Routes} from '@angular/router';

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
