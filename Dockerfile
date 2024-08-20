FROM node:20.16.0-alpine3.20 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

RUN ng build --configuration=production

FROM nginx:1.26.2

COPY --from=build app/dist/altice-labs-case-study/browser /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

EXPOSE 80