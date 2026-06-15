import {Routes} from '@angular/router';

const dashboard = () => import('./views/dashboard/dashboard').then(m => m.Dashboard);
const alerts = () => import('./views/alerts/alerts').then(m => m.Alerts);
const reports = () => import('./views/reports/reports').then(m => m.Reports);

export const analyticsRoutes: Routes = [
  {path: 'dashboard', loadComponent: dashboard},
  {path: 'alerts', loadComponent: alerts},
  {path: 'reports', loadComponent: reports},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];
