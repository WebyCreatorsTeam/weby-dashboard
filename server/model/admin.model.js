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
    },
    enternces: [{
        enternceId: {
            type: Schema.Types.ObjectId,
            ref: 'Login',
            require: true
        }}
    ]
})



AdminSchema.methods.addEnterence = function (enter) {
    const enters = [...this.enternces]
    // const idx = items.findIndex(c => {
    //     return c.remembrId
    // })

    try {
        enters.push({
            enternceId: enter._id
        })
    } catch (err) {
        console.log(err)
    }

    this.enternces = enters 

    return this.save();
}

exports.Admin = model("Admin", AdminSchema)