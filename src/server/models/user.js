const bcrypt = require("bcryptjs");
const pouch = require("./pouch");

const users = pouch("xbo_users");

// let UserSchema = new Schema(
//     {
//         username: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         providers: { type: Object },
//         roles: [String]
//     },
//     {
//         timestamps: true,
//         strict: false
//     }
// );

// db.find({
//     selector: { name: "Mario" },
//     fields: ["_id", "name"],
//     sort: ["name"]
// });

const saltRounds = 10;

const get = id => {
    return users.get(id);
};

const find = params => {
    let { query, fields = null, sort = null, options } = params;

    return users
        .find({
            selector: query,
            fields,
            sort
        })
        .then(res => {
            if (options.single && res && res.docs && res.docs.length > 0) {
                return res.docs[0];
            }
            return res.docs;
        });
};

const create = (username, password) => {
    return users
        .find({
            selector: {
                username
            }
        })
        .then(res => {
            if (res && res.docs && res.docs.length > 0) {
                throw new Error("Username already taken!");
            }

            return new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(
                        users.post({
                            username,
                            password: hash
                        })
                    );
                });
            });
        })
        .then(res => {
            console.log(res);
            return users.get(res.id);
        });
};

const comparePassword = (user, candidatePassword, cb) => {
    // console.log("UserSchema.methods.comparePassword");
    // console.log(user);
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = {
    create,
    find,
    comparePassword,
    get
};

module.exports = User;
