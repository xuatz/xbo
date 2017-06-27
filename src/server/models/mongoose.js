const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

let dbConnectionString = "mongodb://";

if (
    process.env.DB_USER &&
    process.env.DB_PASSWORD &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV !== "dev" &&
    process.env.NODE_ENV !== "test"
) {
    dbConnectionString +=
        process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@";
}

dbConnectionString += process.env.DB_HOST || "localhost";
dbConnectionString += ":" + (process.env.DB_PORT || "27017");
dbConnectionString += "/" + (process.env.DB_NAME || "xbo_development");

// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// console.log("process.env.DB_HOST", process.env.DB_HOST);
// console.log("process.env.DB_NAME", process.env.DB_NAME);
// console.log("dbConnectionString", dbConnectionString);

let options = Object.assign({
    server: {
        poolSize: 3,
        auto_reconnect: true,
        reconnectTries: 3,
        socketOptions: {
            keepAlive: 100,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 30000
        }
    }
});

mongoose.connect(dbConnectionString, options);

if (process.env.NODE_ENV && process.env.NODE_ENV !== "test") {
    mongoose.connection.on("connected", function() {
        console.log("Connection established to MongoDB");
    });
    mongoose.connection.on("reconnected", function() {
        console.log("Reconnected to MongoDB");
    });
}

mongoose.connection.on("error", function(error) {
    console.log("mongoose err", error);
});

module.exports = {
    mongoose,
    uri: dbConnectionString
};
