const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({
    userName: {
        type: String,
        require: [true, "השם חייב להיות מלא"],
    },
    email: {
        type: String,
        require: [true, "אימייל חייב להיות מלא"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: [true, "הסיסמא לא יכולה להיות ריקה"]
    },
    role: {
        type: String,
        require: [true],
        default: "admin"
    }
})

exports.Admin = model("Admin", AdminSchema)