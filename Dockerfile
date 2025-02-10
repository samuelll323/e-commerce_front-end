FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY dist/my-angular-app ./dist

RUN npm install -g http-server

EXPOSE 80

CMD ["http-server", "dist", "-p", "80"]


