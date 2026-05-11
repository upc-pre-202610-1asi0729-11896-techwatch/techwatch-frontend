import { Routes } from '@angular/router';

const homeList = () => import('./home/views/home-list/home-list').then(m=>m.HomeList);
const homeForm = () => import('./home/views/home-form/home-form').then(m=>m.HomeForm);

export const managementRoutes: Routes = [
    { path: 'homes',          loadComponent: homeList },
    { path: 'homes/new',      loadComponent: homeForm },
    { path: 'homes/:id/edit', loadComponent: homeForm },
    { path: 'home',           loadComponent: homeList },
];
