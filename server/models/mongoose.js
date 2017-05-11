const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let dbConnectionString = 'mongodb://';
dbConnectionString += process.env.DB_HOST || 'localhost';
if (process.env.DB_PORT) {
	dbConnectionString += ':' + process.env.DB_PORT;
}
dbConnectionString += '/' + process.env.DB_NAME || 'xbo_development';

let options = Object.assign(
	{
		server: {
			poolSize: 5,
			auto_reconnect: true,
			reconnectTries: 3,
			socketOptions: {
				keepAlive: 100,
				connectTimeoutMS: 5000,
				socketTimeoutMS: 30000
			}
		}
	},
	{
		user: process.env.DB_USER,
		pass: process.env.DB_PASSWORD
	}
);

mongoose.connect(dbConnectionString, options);

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
