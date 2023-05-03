FROM node:18

RUN mkdir -p /server
COPY ./packages/server/. /server
WORKDIR /server

RUN yarn install --silent

EXPOSE 9000

CMD ["yarn", "start"]

# docker build -f Dockerfile.server -t localhost:5000/xbo-server .
# docker build -f Dockerfile.web -t localhost:5000/xbo-web . ; docker build -f Dockerfile.server -t localhost:5000/xbo-server . ;
