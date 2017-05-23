const mongoose = require("./mongoose.js");
const Schema = mongoose.Schema;

var BookmarkSchema = new Schema(
	{
		// userId: { type: Schema.Types.ObjectId, ref: 'User' },
		provider: { type: Schema.Types.String },
		data: Schema.Types.Mixed
		// stats,
		// ...rest
	},
	{
		timestamps: true,
		strict: false
	}
);

// var Cat = mongoose.model('Cat', { name: String });

// var kitty = new Cat({ name: 'YASSSSSSSSSSSSSSSSSS' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
module.exports = Bookmark;
