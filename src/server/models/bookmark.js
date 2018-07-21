const { pouch, get, find, create, update } = require("./pouch");
const bookmarks = pouch("bookmarks");

// var BookmarkSchema = new Schema(
//     {
//         // userId: { type: Schema.Types.ObjectId, ref: 'User' },
//         provider: { type: Schema.Types.String },
//         data: Schema.Types.Mixed,
//         stats: Schema.Types.Mixed
//         // ...rest
//     },
//     {
//         timestamps: true,
//         strict: false
//     }
// );

const Bookmark = {
    create: doc => create(bookmarks, doc),
    find: (params) => find(bookmarks, params),
    update: (doc) => update(bookmarks, doc),
    get: (id) => get(bookmarks, id)
};

module.exports = Bookmark;