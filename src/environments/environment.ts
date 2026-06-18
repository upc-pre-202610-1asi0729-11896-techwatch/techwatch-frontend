export const environment = {
  production: true,
  // Production build talks to the deployed backend directly (no dev-server proxy).
  apiBaseUrl: 'https://techwatch-backend-production.up.railway.app/api/v1',
  propertiesEndpointPath: '/properties',
  devicesEndpointPath: '/devices',
  simulationSessionsEndpointPath: '/simulation-sessions',
  metricsEndpointPath: '/metrics',
  alertsEndpointPath: '/alerts',
  reportsEndpointPath: '/reports',
};
