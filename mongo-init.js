print('Start ######################################################');

db = db.getSiblingDB('xbo_dev');
db.createUser({
  user: 'xbo_user',
  pwd: 'secure-xbo-password',
  roles: [
    {
      role: 'dbOwner',
      db: 'xbo_dev',
    },
  ],
});

print('END ######################################################');
