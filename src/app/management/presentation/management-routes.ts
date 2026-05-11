import { Routes } from '@angular/router';

const homeList = () => import('./home/views/home-list/home-list').then(m=>m.HomeList);

export const managementRoutes: Routes = [
    { path: 'homes',          loadComponent: homeList },
    { path: 'homes/new',      loadComponent: homeList },
    { path: 'homes/:id/edit', loadComponent: homeList },
    { path: 'home',           loadComponent: homeList },
];
