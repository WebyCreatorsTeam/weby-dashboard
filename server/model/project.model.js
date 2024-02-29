const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema({
    urlImage: {
        type: String,
    },
    name: {
        type: String,
        require: [true, "שם הפרויקט חייב להיות מלא"],
    },
    description: {
        type: String,
        require: [true, "תיאור הפרויקט חייב להיות מלא"],
    },
    urlSite: {
        type: String
    },
    draft: {
        type: Boolean,
        default: true
    }
})

exports.Projects = model("Projects", ProjectSchema)