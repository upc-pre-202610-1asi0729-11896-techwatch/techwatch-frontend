export const environment = {
  production: false,
  // In development the requests go through the ng serve proxy (proxy.conf.json),
  // which forwards /api to the Spring Boot backend at http://localhost:8080.
  apiBaseUrl: '/api/v1',
  propertiesEndpointPath: '/properties',
  devicesEndpointPath: '/devices',
  simulationSessionsEndpointPath: '/simulation-sessions',
  metricsEndpointPath: '/metrics',
  alertsEndpointPath: '/alerts',
  reportsEndpointPath: '/reports',
  authEndpointPath: '/auth',
  usersEndpointPath: '/users',
};
