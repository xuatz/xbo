FROM node:14.16.0

WORKDIR /server

COPY package*.json ./

RUN npm i -g pnpm
RUN pnpm --filter server install

COPY ./ ./

RUN pnpm --filter server run build

EXPOSE 9000

CMD ["pnpm", "start"]

# docker build -f Dockerfile.server -t localhost:5000/xbo-server .
# docker build -f Dockerfile.web -t localhost:5000/xbo-web . ; docker build -f Dockerfile.server -t localhost:5000/xbo-server . ;
