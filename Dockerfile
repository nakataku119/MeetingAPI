FROM node:16.17
WORKDIR /usr/src/app

COPY ./package* ./
RUN npm install

COPY . .