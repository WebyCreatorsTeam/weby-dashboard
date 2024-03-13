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

        return res.status(httpCodes.OK).send({ continueWork: true })
    } catch (error) {
        console.log(`feedback cont error saveNewFeedback`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}