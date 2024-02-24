const { Schema, model } = require('mongoose')

const LoginSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    userName: {
        type: String,
        require
    },
    date: { type: Date, default: Date.now },
})

exports.Login = model("Login", LoginSchema)