import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    title: 'Dashboard Home',
  },
  {
    path: 'dashboard',
    title: 'Dashboard Home',
    loadComponent: () =>
      import('./features/layouts/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];
