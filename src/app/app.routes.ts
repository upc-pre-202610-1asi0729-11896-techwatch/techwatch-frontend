import { Routes } from '@angular/router';

const managementRoutes = () => import('./management/presentation/management-routes').then(m => m.managementRoutes);
const analyticsRoutes = () => import('./analytics/presentation/analytics.routes').then(m => m.analyticsRoutes);

export const routes: Routes = [
  { path: 'management',  loadChildren: managementRoutes },
  { path: 'analytics',   loadChildren: analyticsRoutes },
  { path: '',            redirectTo: '/management/devices', pathMatch: 'full' },
];
