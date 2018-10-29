# xuatz bookmark organiser

This app aims to act as a curator of all your personal "bookmarks" from various websites and display them in a meaningful manner automagically.

You do not need to break your usage pattern, continue to add youtube videos to "Watch Later", save another 500 reddit posts that you will never revisit and add yet another webpage to Pocket. This application will pull from the various services that you use and attempt to organise them in meaningful ways such as:

1. group/order by websites
1. keyword count
1. click frequency
1. thumbs up/down
1. etc

# Roadmap

- Server
  - I don’t want to any changes to the backend code anymore until i reach some milestone for the frontend
  - I have confirmed that xbo#master is working fine
  - I have plans to migrate db from mongodb to couchdb, in the future
  - the remaining server tasks include:
    [ ] mongorestore dump in unraid-mongo
    [ ] setup running instance of xbo-server
  - wishlist
    [ ] sync job xbo-server between mongo to couchdb
    [ ] take note of soft-delete flag
    [ ] define business logic for conflict resolution:
      [ ] what fields to overwrite
      [ ] what fields to append
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
