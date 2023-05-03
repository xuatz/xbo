# Xuatz Bookmark Manager 
> (also known as xuatz bookmark organiser)

## What do you need?

* [git](https://git-scm.com/downloads)
* [node@16](https://github.com/nvm-sh/nvm)
* [pnpm@7](https://pnpm.io/installation)
* [docker](https://docs.docker.com/get-docker/)

## Getting Started

### Create a Pushbullet account

* https://www.pushbullet.com/

### Create a Pushbullet client

* go to https://www.pushbullet.com/#settings/clients
  * for local development (and using default configs)
    * name: <up to you>
    * website: http://localhost:3000
    * redirect_uri: http://localhost:9000/auth/connect/pushbullet/callback
    * allowed_origin: *
  * get the `client_id` and `client_secret`

### Prepare the .env files

* go to each of the projects, `packages/client` and `packages/server` and copy the `.env_sample` into `.env`
  * `cd packages/client`
  * `cp .env_sample .env`
* replace the environment variables as required
  * specifically, you need to replace `PUSHBULLET_APP_CLIENT_ID` and `PUSHBULLET_APP_CLIENT_SECRET` with the values you got from  
    `Create a Pushbullet client` above
  
### Start the database

> Currently I am only using docker to start and seed the mongodb for local development purposes
```bash
docker compose up -d
```

### Create admin user for PocketBase 

* go to http://localhost:8090/_/
* create admin user

### Install dependencies

```bash
pnpm i 
```

### Start server

```bash
pnpm -F server run dev
```

The server can be found at http://localhost:9000

### Start client

```bash
pnpm -F client run dev 
```

The client can be found at http://localhost:3000

## Posterity

### hack for `pocketbase-js-sdk`
I used a hack for pocketbase-js-sdk to make it work on remix. I used to reference it in the commit but it was being a little noisy on the main issue so I'm moving it here instead.
https://github.com/pocketbase/js-sdk/issues/34#issuecomment-1364348123
