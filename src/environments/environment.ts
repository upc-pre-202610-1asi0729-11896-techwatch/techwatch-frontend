export const environment = {
  production: true,
  // Production build talks to the backend directly (no dev-server proxy).
  apiBaseUrl: 'http://localhost:8080/api/v1',
  propertiesEndpointPath: '/properties',
  devicesEndpointPath: '/devices',
  simulationSessionsEndpointPath: '/simulation-sessions',
  metricsEndpointPath: '/metrics',
  alertsEndpointPath: '/alerts',
  reportsEndpointPath: '/reports',
};
