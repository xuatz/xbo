# xuatz bookmark organiser

[![Maintainability](https://api.codeclimate.com/v1/badges/22af2c1116f0a0da638f/maintainability)](https://codeclimate.com/github/xuatz/xbo/maintainability)

This app aims to act as a curator of all your personal "bookmarks" from various websites and display them in a meaningful manner automagically.

You do not need to break your usage pattern, continue to add youtube videos to "Watch Later", save another 500 reddit posts that you will never revisit and add yet another webpage to Pocket. This application will pull from the various services that you use and attempt to organise them in meaningful ways such as:

1. group/order by websites
1. keyword count
1. click frequency
1. thumbs up/down
1. etc

## What can I do?

1. create account
2. login
3. logout
4. connect to Pushbullet
5. Tabs
   1. Home Page - Shows Urls and Notes
   1. Gallery - Shows media/photo
   1. Profile - connects to different data sources
   1. Organiser - Attempt to build a module to process bookmarks (tag, delete, other actions???)
6. inefficiently fetching latest pushes from pushbullet on every request
7. inefficiently fetching all pushes from server on every client request
8. infinity scroll
9. delete push at origin from client (without confirmation!!! DANGER)

## Get Started

### Development with Docker

```bash
~$ install docker
~$ git clone ...
~$ docker-compose up -d
```

> `$ docker-compose up --build --force-recreate -d`
> you might need this sometimes

### Development on local machine

You know the drill

## Supported data sources

- https://www.pushbullet.com

## Roadmap

### 2022
- revamp fetch pushbullet pushes and store it with hasura
### 2019 (will revist and update the list here according before the end of ~~2019~~ 2022 lul)

- Proper zero to full sync strategy
  - should save to database on each page load
  - migrate to use CockroachDB
  - should have a way to keep track of sync progress
    - timestamp of push?
    - sync token
  - should be able to resume sync gracefully
- setup a message queue to push updates for clients to receive updates
  - setup RabbitMQ server
  - setup RabbitMQ client
- setup GraphQL server
- setup WatermelonDB for the client
  - client should subscribe to changes and fetch changes
  - client should implement lazy loading

### 2018 (will revist and update the list here according before the end of ~~2019~~ 2022 lul)

- Server
  - I don’t want to any changes to the backend code anymore until i reach some milestone for the frontend
  - I have confirmed that xbo#master is working fine
  - I have plans to migrate db from mongodb to couchdb, in the future
  - the remaining server tasks include:
    - [x] mongorestore dump in unraid-mongo
    - [x] setup running instance of xbo-server
  - wishlist
    - [ ] sync job xbo-server between mongo to couchdb
    - [ ] take note of soft-delete flag
    - [ ] define business logic for conflict resolution:
      - [ ] what fields to overwrite
      - [ ] what fields to append
- Client
  - Register/Login flow
  - navbar (basically pages)
    - front/main
    - organiser
    - stats
    - gallery
    - profile/settings
    - logout
  - Landing Page vs Logged In Page implementation
