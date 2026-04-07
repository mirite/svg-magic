FROM node:24-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install
COPY . .
RUN yarn build

FROM alpine AS server

RUN apk add brotli nginx nginx-mod-http-brotli

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
