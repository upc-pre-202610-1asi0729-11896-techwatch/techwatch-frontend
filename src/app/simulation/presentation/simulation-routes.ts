import {Routes} from '@angular/router';

const simulation = () => import('./views/simulation/simulation').then(m => m.Simulation);

export const simulationRoutes: Routes = [
  {path: '', loadComponent: simulation},
];
