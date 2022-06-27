FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci && \
  npm run build

FROM nginx:1.20-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html