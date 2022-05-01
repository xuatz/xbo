import * as bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

let UserSchema = new Schema(
  {
    _id: { type: String },
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    providers: { type: Object }, // @todo i should type this
    roles: [String],
  },
  {
    timestamps: true,
    strict: false,
  },
)

const saltRounds = 10
UserSchema.pre('save', function (next) {
  let user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err)
    }

    // override the cleartext password with the hashed one
    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  // console.log("UserSchema.methods.comparePassword");
  // console.log(this);
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

export const User = mongoose.model('User', UserSchema)
