import {Routes} from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./core/pages/home/home.component'),
	},
	{
		path: 'auth',
		loadComponent: () => import('./core/pages/auth/auth.component'),
		children: [
			{
				path: 'login',
				loadComponent: () =>
					import('./features/auth/components/login-form.component'),
			},
			{
				path: 'signup',
				loadComponent: () =>
					import('./features/auth/components/signup-form.component'),
			},
		],
	},
];
