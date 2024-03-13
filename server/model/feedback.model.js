const { Schema, model } = require('mongoose')

const FeedbackSchema = new Schema({
    customerName: {
        type: String,
        require
    },
    webSiteName: {
        type: String,
        require
    },
    customerFeedback: {
        type: String,
        require
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Projects"
    },
})

FeedbackSchema.methods.addProjectID = function (projectID) {
    try {
        this.projectId = projectID
        return this.save();
    } catch (error) {
        console.log(erro)
    }
}

exports.Feedback = model("Feedback", FeedbackSchema)