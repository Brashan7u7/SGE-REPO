# Etapa 1: build de Angular
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: servir con Nginx
FROM nginx:alpine
# Aquí apuntamos a la carpeta correcta
COPY --from=builder /app/dist/sge-front/browser/ /usr/share/nginx/html
COPY ./nginx/default.conf              /etc/nginx/conf.d/default.conf
