import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'ect',
    children: [
      {
        path: 'items',
        loadComponent: () => import('./features/items/items.component').then((m) => m.ItemsComponent),
      },
      {
        path: '**',
        redirectTo: 'items',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'ect/items',
    pathMatch: 'full'
  },
];
