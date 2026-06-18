# Dockerfile for techwatch-frontend (Angular 21)
# Summary:
#   Multi-stage build: compiles the Angular app with Node and serves the static
#   production bundle with nginx.
# Description:
#   The build stage runs `npm ci` + `ng build` (production configuration, which
#   uses src/environments/environment.ts pointing at the deployed backend).
#   The runtime stage serves the static files with nginx, with SPA fallback so
#   client-side routes resolve to index.html.
# Version: 1.0
# Maintainer: TechWatch Development Team

# Step 1: Build the Angular application
FROM node:22-alpine AS build
WORKDIR /app
# Install dependencies first so this layer is cached across source-only changes
COPY package.json package-lock.json ./
RUN npm ci
# Copy sources and produce the production build
COPY . .
RUN npm run build -- --configuration production

# Step 2: Serve the static bundle with nginx
FROM nginx:1.27-alpine AS runtime
# SPA-aware nginx config (listens on port 8080, which Railway auto-detects)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Angular's application builder emits the browser bundle under dist/<project>/browser
COPY --from=build /app/dist/frontend-techwatch/browser /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
