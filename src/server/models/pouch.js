const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

const pouch = dbname => {
    let db = new PouchDB(dbname);
    if (process.env.REMOTE_COUCHDB_URL) {
        let {
            COUCHDB_HTTPS,
            COUCHDB_URL,
            COUCHDB_USER,
            COUCHDB_PASS
        } = process.env;

        let url =
            (COUCHDB_HTTPS ? "https://" : "http://") + COUCHDB_USER
                ? COUCHDB_USER + COUCHDB_PASS
                : "" + COUCHDB_URL ? COUCHDB_URL : "localhost";

        PouchDB.sync(dbname, url + "/" + dbname)
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

const find = (magic, params) => {
    let { query, fields = null, sort = null, options = {} } = params;
    let { single = false } = options;

    return magic
        .find({
            selector: query,
            fields,
            sort
        })
        .then(res => {
            if (single) {
                if (res && res.docs && res.docs.length > 0) {
                    return res.docs[0];
                } else {
                    return null;
                }
            }
            return res.docs;
        });
};

const update = (magic, doc) => {
    return magic
        .get(doc._id)
        .then(latestDoc =>
            magic.put(
                Object.assign({}, latestDoc, doc, {
                    _rev: latestDoc._rev
                })
            )
        )
        .then(res => {
            if (res && res.ok) {
                return magic.get(res.id).then(doc => {
                    res, doc;
                });
            }
            return { res };
        });
};

const create = (magic, doc) => {
    return magic.post(doc).then(res => {
        if (res && res.ok) {
            return magic.get(res.id).then(doc => {
                res, doc;
            });
        }
        return { res };
    });
};

module.exports = {
    pouch,
    create,
    update,
    find,
    get: (magic, id) => magic.get(id)
};
