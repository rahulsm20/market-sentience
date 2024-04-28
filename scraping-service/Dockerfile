FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN apk add chromium

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]