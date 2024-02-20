// const { mongoose } = require('mongoose');
const cloudinary = require("cloudinary").v2;
const { Projects } = require("../../model/project.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index")

const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

exports.saveNewProject = async (req, res) => {
    try {
        const { name, description, urlSite } = req.query

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        if (!cldRes.secure_url) {
            console.error("project controller validation error of saveNewProject:", error.message)
            return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "שגיא" });
        }

        const newProject = new Projects({ urlImage: cldRes.secure_url, name, description, urlSite })
        await newProject.save()
        return res.status(httpCodes.OK).send({ continueWork: true })
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

exports.deleteProject = async (req, res) => {
    try {
        const { id, url } = req.body
        const publicId = getPublicId(url)
        await cloudinary.uploader.destroy(`weby/${publicId}`);
        await Projects.findByIdAndDelete(id)
        return res.status(httpCodes.OK).send({ continueWork: true })
    } catch (error) {
        console.log(`projects cont error deleteProject`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.showProductToUpdate = async (req, res) => {
    try {
        const { id } = req.body
        const project = await Projects.findById(id)
        return res.status(httpCodes.OK).send(project)
    } catch (error) {
        console.log(`projects cont error showProductToUpdate`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

const imageUpdater = async (imagePublicId, imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: `weby/${imagePublicId}`
        })
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

exports.hendleReplace = async (req, res) => {
    try {
        const { id, oldURL } = req.query
        const publicId = getPublicId(oldURL)

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const {secure_url} = await imageUpdater(publicId, dataURI )
        const project = await Projects.findByIdAndUpdate(id, {urlImage: secure_url})
        return res.send({ok: true, secure_url})
    } catch (error) {
        console.log(`projects cont error hendleReplace`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}


// exports.updateProductImage = async (req, res) => {
//     try {
//         // const b64 = Buffer.from(req.file.buffer).toString("base64");
//         // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//         // const cldRes = await handleUpload(dataURI);

//         // if (!cldRes.secure_url) {
//         //     console.error("project controller validation error of saveNewProject:", error.message)
//         //     return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "שגיא" });
//         // }
//     } catch (error) {
//         console.log(`projects cont error updateProductImage`)
//         console.error(error);
//         return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
//     }
// }