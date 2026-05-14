import {Routes} from '@angular/router';

const dashboard = () => import('./views/dashboard/dashboard').then(m => m.Dashboard);
const consumptionHistory = () => import('./views/consumption-history/consumption-history').then(m => m.ConsumptionHistory);

export const analyticsRoutes: Routes = [
  { path: 'dashboard', loadComponent: dashboard },
  { path: 'history',   loadComponent: consumptionHistory },
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
];
