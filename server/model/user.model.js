const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    userName: { type: String, require: true },
    userEmail: { type: String, require: true, trim: true, lowercase: true },
    userPhone: { type: String, require: true },
    userHelp: { type: String, require: true },
    archive: {type: Boolean, default: false},
    favorite: {type: Boolean, default: false}
})

exports.User = model("User", UserSchema)