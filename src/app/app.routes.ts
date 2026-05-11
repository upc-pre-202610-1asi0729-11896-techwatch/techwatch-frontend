import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const managementRoutes = () => import('./management/presentation/management-routes').then(m=>m.managementRoutes);

export const routes: Routes = [
  { path: 'home',         component:        Home,},
  { path: 'managament',   loadChildren:     managementRoutes},
  { path: '',             redirectTo:       '/home',            pathMatch: 'full'  },
];
