FROM node:latest AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build app/dist/altice-labs-case-study/browser /usr/share/nginx/html

EXPOSE 80