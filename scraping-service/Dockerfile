FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV CHROME_BIN=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
