import mongoose from 'mongoose'
const Schema = mongoose.Schema

var BookmarkSchema = new Schema(
  {
    // userId: { type: Schema.Types.ObjectId, ref: 'User' },
    provider: { type: Schema.Types.String },
    data: Schema.Types.Mixed,
    stats: Schema.Types.Mixed,
    // ...rest
  },
  {
    timestamps: true,
    strict: false,
  }
)

export const Bookmark = mongoose.model('Bookmark', BookmarkSchema)
