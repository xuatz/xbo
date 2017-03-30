const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// let dbConnectionString = 'mongodb://';
// if (config.db.host) {
// 	dbConnectionString += config.db.host;
// }
// if (config.db.port) {
// 	dbConnectionString += ":" + config.db.port;
// }
// dbConnectionString += "/" + config.db.name;

let options = {
    // db: 'xpo',
    server: {
        poolSize: 5,
        auto_reconnect: true,
        reconnectTries: 3,
        socketOptions: {
            keepAlive: 100,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 30000,
        },
    },
    user: 'admin',
    pass: 'nRG2&kYUXRfcPhDPfw4w',
};

let host = 'xuatz.duckdns.org' || 'localhost';

mongoose.connect('mongodb://' + host + '/xpo', options);

mongoose.connection.on('error', function(error) {
    console.log('mongoose err', error);
});
mongoose.connection.on('connected', function() {
    console.log('Connection established to MongoDB');
});
mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

module.exports = mongoose;
