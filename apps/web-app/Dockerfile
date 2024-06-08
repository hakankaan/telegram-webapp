
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --force

COPY . .

RUN npx nx run web-app:build --configuration=production

FROM nginx:stable-alpine

COPY --from=builder /app/dist/apps/web-app /usr/share/nginx/html

COPY /apps/web-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
