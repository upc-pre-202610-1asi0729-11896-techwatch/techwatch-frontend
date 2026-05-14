import { Routes } from '@angular/router';

const homeList = () => import('./views/home/home-list/home-list').then(m => m.HomeList);
const homeForm = () => import('./views/home/home-form/home-form').then(m => m.HomeForm);
const deviceList = () => import('./views/device/device-list/device-list').then(m => m.DeviceList);
const deviceForm = () => import('./views/device/device-form/device-form').then(m => m.DeviceForm);

export const managementRoutes: Routes = [
  { path: 'homes',            loadComponent: homeList },
  { path: 'homes/new',        loadComponent: homeForm },
  { path: 'homes/:id/edit',   loadComponent: homeForm },
  { path: 'devices',          loadComponent: deviceList },
  { path: 'devices/new',      loadComponent: deviceForm },
  { path: 'devices/:id/edit', loadComponent: deviceForm },
  { path: '',                 redirectTo: 'devices', pathMatch: 'full' },
];
