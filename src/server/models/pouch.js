const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const pouch = dbname => {
    let db = new PouchDB(dbname);

    if (process.env.REMOTE_DB_URL) {
        PouchDB.sync(dbname, process.env.REMOTE_DB_URL + "/" + dbname)
            .on("change", function(info) {
                console.log(dbname + " onChanged");
                console.log(info);
            })
            .on("paused", function(err) {
                console.log(dbname + " onPaused");
                console.log(err);
            })
            .on("active", function() {
                // replicate resumed (e.g. new changes replicating, user went back online)
            })
            .on("denied", function(err) {
                // a document failed to replicate (e.g. due to permissions)
            })
            .on("complete", function(info) {
                // handle complete
            })
            .on("error", function(err) {
                console.log(dbname + " onError");
                console.log(err);
            });
    }

    return db;
};

module.exports = pouch;
