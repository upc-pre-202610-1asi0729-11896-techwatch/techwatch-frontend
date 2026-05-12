import { Routes } from '@angular/router';

const homeList = () => import('./views/home/home-list/home-list').then(m=>m.HomeList);
const homeForm = () => import('./views/home/home-form/home-form').then(m=>m.HomeForm);

const deviceList = () => import('./views/device/device-list/device-list').then(m=>m.DeviceList);

export const managementRoutes: Routes = [
    { path: 'homes',          loadComponent: homeList },
    { path: 'homes/new',      loadComponent: homeForm },
    { path: 'homes/:id/edit', loadComponent: homeForm },
    { path: 'devices',          loadComponent: deviceList },
    { path: 'devices/new',      loadComponent: homeForm },
    { path: 'devices/:id/edit', loadComponent: homeForm },
];
