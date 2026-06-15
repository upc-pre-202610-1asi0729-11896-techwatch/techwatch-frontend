import { Routes } from '@angular/router';

const managementRoutes = () => import('./management/presentation/management-routes').then(m => m.managementRoutes);
const simulationRoutes = () => import('./simulation/presentation/simulation-routes').then(m => m.simulationRoutes);
const analyticsRoutes = () => import('./analytics/presentation/analytics.routes').then(m => m.analyticsRoutes);

export const routes: Routes = [
  { path: 'management',  loadChildren: managementRoutes },
  { path: 'simulation',  loadChildren: simulationRoutes },
  { path: 'analytics',   loadChildren: analyticsRoutes },
  { path: '',            redirectTo: '/management/properties', pathMatch: 'full' },
];
