import { Routes } from '@angular/router';

const managementRoutes = () => import('./management/presentation/management-routes').then(m => m.managementRoutes);
const simulationRoutes = () => import('./simulation/presentation/simulation-routes').then(m => m.simulationRoutes);
const analyticsRoutes = () => import('./analytics/presentation/analytics.routes').then(m => m.analyticsRoutes);
const iamRoutes = () => import('./iam/presentation/iam-routes').then(m => m.iamRoutes);
const profileRoutes = () => import('./profile/presentation/profile-routes').then(m => m.profileRoutes);

export const routes: Routes = [
  { path: 'management',  loadChildren: managementRoutes },
  { path: 'simulation',  loadChildren: simulationRoutes },
  { path: 'analytics',   loadChildren: analyticsRoutes },
  { path: 'iam',         loadChildren: iamRoutes },
  { path: 'profile',     loadChildren: profileRoutes },
  { path: '',            redirectTo: '/management/properties', pathMatch: 'full' },
];
