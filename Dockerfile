# Build stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage — Cloud Run expects the container to listen on $PORT (default 8080)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf 'server { listen 8080; root /usr/share/nginx/html; index index.html; location / { try_files $uri /index.html; } }\n' > /etc/nginx/conf.d/default.conf && rm -f /etc/nginx/conf.d/default.conf.bak
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
