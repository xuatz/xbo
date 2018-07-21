const bcrypt = require("bcryptjs");
const { pouch, find, update } = require("./pouch");

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

const users = pouch("xbo_users");

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
                bcrypt.hash(password, saltRounds, function (err, hash) {
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
        .then(res => get(res.id));
};

const comparePassword = (user, candidatePassword, cb) => {
    // console.log("UserSchema.methods.comparePassword");
    users.get(user._id).then(user => {
        bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    })
};

const get = (id) => users.get(id)
    .then(user => {
        delete user.password;
        return user;
    })

const User = {
    find: (params) => {
        return find(users, params)
            .then(res => {
                if (!res) {
                    return null;
                }
                if (res.length > 0) {
                    return Promise.map(res, (u => {
                        delete u.password
                        return u
                    }))
                } else {
                    delete res.password
                    return res
                }
            })
    },
    get,
    create,
    comparePassword
}

module.exports = User;
