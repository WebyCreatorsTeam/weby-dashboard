const { Feedback } = require("../../model/feedback.model");
const { Projects } = require("../../model/project.model");
const { httpCodes } = require("../../utils/httpCodes/index");

exports.saveNewFeedback = async (req, res) => {
    try {
        const { feedbackDetails: { projectId, customerName, webSiteName, customerFeedback } } = req.body
        const feedback = new Feedback({ projectId, customerName, webSiteName, customerFeedback })
        await feedback.save()
        await feedback.addProjectID(projectId)
        const project = await Projects.findById(projectId)
        await project.addFeedback(feedback)

        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`feedback cont error saveNewFeedback`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.updateFeedback = async (req, res) => {
    try {
        const { feedbackUpdate: { customerFeedback, customerName, feedbackID } } = req.body
        await Feedback.findByIdAndUpdate(feedbackID, { customerFeedback, customerName })
        return res.status(httpCodes.OK).json({ continueWork: true, customerFeedback, customerName, feedbackID, message: "פידבק עודכן" })
    } catch (error) {
        console.log(`feedback cont error updateFeedback`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const { feedbackID } = req.body
        await Feedback.findByIdAndUpdate(feedbackID, { customerFeedback: '' })
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`feedback cont error deleteFeedback`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.showAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ "customerFeedback": { "$gt": 0 } })
        return res.status(httpCodes.OK).json({ continueWork: true, feedbacks })
    } catch (error) {
        console.log(`feedback cont error showAllFeedbacks`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}