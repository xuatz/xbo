FROM node:11.15.0

RUN mkdir -p /usr/www 
COPY . /usr/www
WORKDIR /usr/www

RUN yarn install --silent

EXPOSE 9000

CMD ["npm", "run", "start"]

# docker build -f Dockerfile.server -t localhost:5000/xbo-server .
# docker build -f Dockerfile.web -t localhost:5000/xbo-web . ; docker build -f Dockerfile.server -t localhost:5000/xbo-server . ;
