const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// mongodb://username:password@host:port/datab
let dbConnectionString = "mongodb://";

dbConnectionString +=
    process.env.DB_USER && process.env.DB_PASSWORD
        ? process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@"
        : "";
dbConnectionString += process.env.DB_HOST || "localhost";
dbConnectionString += ":" + (process.env.DB_PORT ? process.env.DB_PORT : "27017");
dbConnectionString += "/" + (process.env.DB_NAME || "xbo_dev");

console.log("dbConnectionString", dbConnectionString);

let options = {
    useNewUrlParser: true
};

mongoose.connect(dbConnectionString, options);

mongoose.connection.on("error", function (error) {
    console.log("mongoose err", error);
});
mongoose.connection.on("connected", function () {
    console.log("Connection established to MongoDB");
});
mongoose.connection.on("reconnected", function () {
    console.log("Reconnected to MongoDB");
});

module.exports = {
    mongoose,
    uri: dbConnectionString
};
