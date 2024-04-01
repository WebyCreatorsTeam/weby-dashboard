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
    },
    customerFeedback: {
        type: Schema.Types.ObjectId,
        ref: "Feedback"
    },
    projectType: {
        type: String,
        require: [true, "צריך לבחוק סוג הפרויקט"]
    }
})

ProjectSchema.methods.addFeedback = function (cfb) {
    try {
        this.customerFeedback = cfb._id
        return this.save();
    } catch (error) {
        console.log(error)
    }
}

exports.Projects = model("Projects", ProjectSchema)