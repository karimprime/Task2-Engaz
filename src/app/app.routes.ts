import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { loggedGuard } from './core/guards/logged-user/logged-user.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
{ path: '', redirectTo: 'auth-layout', pathMatch: 'full' },
  {
    path: 'auth-layout',
    component: AuthLayoutComponent,
    title: 'Dashboard Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        title: 'Login',canActivate: [loggedGuard],
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        title: 'Register',
        canActivate: [loggedGuard],
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
  ]},
  {
    path: 'dashboard',
    title: 'Dashboard Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/layouts/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./features/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
