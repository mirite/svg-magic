# Stage 2: Serve the deploy tool using Nginx
FROM alpine AS server

RUN apk add brotli nginx nginx-mod-http-brotli

COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
