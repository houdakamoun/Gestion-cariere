# Build stage
FROM node:20-bookworm-slim AS build

WORKDIR /app

ARG API_URL=
ARG FRONTEND_URL=http://localhost:8080
ENV API_URL=${API_URL} FRONTEND_URL=${FRONTEND_URL}

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN node -e "const fs=require('fs');const api=process.env.API_URL;const front=process.env.FRONTEND_URL;fs.writeFileSync('src/environments/environment.prod.ts','export const environment = { production: true, apiUrl: \\''+api+'\\', frontendUrl: \\''+front+'\\' };\\n');"

RUN npm run build -- --configuration=production

# Runtime stage
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1
