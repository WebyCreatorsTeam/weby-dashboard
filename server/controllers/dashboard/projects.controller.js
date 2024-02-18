// const { mongoose } = require('mongoose');
const { Projects } = require("../../model/project.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index")

exports.saveNewProject = async (req, res) => {
    try {
        const { name, description, urlSite } = req.query
       
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        if(!cldRes.secure_url)  {
            console.error("project controller validation error of saveNewProject:", error.message)
            return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "שגיא" });
        }

        const newProject = new Projects({ urlImage: cldRes.secure_url, name, description, urlSite })
        await newProject.save()
        return res.status(httpCodes.OK).send({ continue: true })
    } catch (error) {
        console.log(`projects cont error saveNewProject`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Projects.find({})
        return res.status(httpCodes.OK).send(projects)
    } catch (error) {
        console.log(`projects cont error getAllProjects`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};