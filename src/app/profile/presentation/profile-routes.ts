import {Routes} from '@angular/router';

const profileEdit = () => import('./views/profile-edit/profile-edit').then(m => m.ProfileEdit);

export const profileRoutes: Routes = [
  {path: '', loadComponent: profileEdit},
];
