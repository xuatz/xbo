FROM node:14.16.0

RUN mkdir -p /client
COPY ./packages/client/. /client
WORKDIR /client

RUN yarn install --silent