const cloudinary = require("cloudinary").v2;
const { Feedback } = require("../../model/feedback.model");
const { Projects } = require("../../model/project.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index");
const { getPublicId, imageUpdater } = require("./utils/file");

exports.saveNewProject = async (req, res, next) => {
    try {
        const { name, description, urlSite, draft, customerName, customerFeedback, projectType } = req.query

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        if (!cldRes.secure_url) {
            console.error("project controller validation error of saveNewProject:", error.message)
            return res.status(httpCodes.BAD_REQUEST).json({ continueWork: false, message: "שגיא" });
        }

        const newProject = new Projects({ urlImage: cldRes.secure_url, name, description, urlSite, draft, projectType })

        await newProject.save()
        const feedback = new Feedback({ projectId: newProject._id, customerName, webSiteName: name, customerFeedback })
        await feedback.save()
        await feedback.addProjectID(newProject)
        await newProject.addFeedback(feedback)

        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        next()
    }
};

exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Projects.find({})
        return res.status(httpCodes.OK).json(projects)
    } catch (error) {
        next()
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const { id, url } = req.body
        const publicId = getPublicId(url)
        await cloudinary.uploader.destroy(`weby/${publicId}`);
        await Feedback.deleteOne({ projectId: id })
        await Projects.findByIdAndDelete(id)
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        next()
    }
};

exports.showProjectToUpdate = async (req, res, next) => {
    try {
        const { id } = req.body
        const projectOne = await Projects.findById(id)

        const project = await projectOne
            .populate('customerFeedback')

        return res.status(httpCodes.OK).json(project)
    } catch (error) {
        next()
    }
}

exports.hendleReplace = async (req, res, next) => {
    try {
        const { id, oldURL } = req.query
        const publicId = getPublicId(oldURL)

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const { secure_url } = await imageUpdater(publicId, dataURI)
        await Projects.findByIdAndUpdate(id, { urlImage: secure_url })
        return res.status(httpCodes.OK).json({ continueWork: true, secure_url })
    } catch (error) {
        next()
    }
}

exports.editProductTexts = async (req, res, next) => {
    try {
        const { textUpdate: { name, description, urlSite, projectType }, id } = req.body
        await Projects.findByIdAndUpdate(id, { name, description, urlSite, projectType })
        return res.status(httpCodes.OK).json({ continueWork: true, texts: { name, description, urlSite, projectType } })
    } catch (error) {
        next()
    }
}

exports.saveAsDraftorNotToBe = async (req, res, next) => {
    try {
        const { draft, id } = req.body
        await Projects.findByIdAndUpdate(id, { draft })
        return res.status(httpCodes.OK).json({ continueWork: true, message: "הפרויקט עודכן" })
    } catch (error) {
        next()
    }
}