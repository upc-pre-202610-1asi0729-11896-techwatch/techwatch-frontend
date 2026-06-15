import {Routes} from '@angular/router';

const propertyList = () => import('./views/property/property-list/property-list').then(m => m.PropertyList);
const propertyForm = () => import('./views/property/property-form/property-form').then(m => m.PropertyForm);
const propertyDetail = () => import('./views/property/property-detail/property-detail').then(m => m.PropertyDetail);
const spaceForm = () => import('./views/space/space-form/space-form').then(m => m.SpaceForm);
const deviceForm = () => import('./views/device/device-form/device-form').then(m => m.DeviceForm);

export const managementRoutes: Routes = [
  {path: 'properties', loadComponent: propertyList},
  {path: 'properties/new', loadComponent: propertyForm},
  {path: 'properties/:propertyId', loadComponent: propertyDetail},
  {path: 'properties/:propertyId/spaces/new', loadComponent: spaceForm},
  {path: 'properties/:propertyId/spaces/:spaceId/devices/new', loadComponent: deviceForm},
  {path: 'properties/:propertyId/spaces/:spaceId/devices/:deviceId/edit', loadComponent: deviceForm},
  {path: '', redirectTo: 'properties', pathMatch: 'full'},
];
