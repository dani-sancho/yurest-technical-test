import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listado',
    loadComponent: () =>
      import('./presentation/views/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Yurest: Listado',
  },
  {
    path: 'nueva-reserva',
    loadComponent: () =>
      import('./presentation/views/new-booking/new-booking.component').then(m => m.NewBookingComponent),
    title: 'Yurest: Nueva Reserva',
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./presentation/views/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Yurest: Detalle',
  },
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
];
