const cloudinary = require("cloudinary").v2;
const { Post } = require("../../model/blog.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index");
const { getPublicId, imageUpdater } = require("./utils/file");
// const { getPublicId, imageUpdater } = require("./projects.controller");

exports.getBlog = async (req, res) => {
    try {
        const blogs = await Post.find({})
        const blog = blogs.map(bl => ({ ...bl._doc, content: bl.content.replace(/(<([^>]+)>)/gi, "").slice(0, 80) }))
        return res.status(httpCodes.OK).json({ continueWork: true, blog })
    } catch (error) {
        console.log(`blog cont error addNewPost`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.addNewPost = async (req, res) => {
    try {
        const { title, content, draft, summerry, postImg } = req.body;
        // console.log(req.file)
        // const b64 = Buffer.from(req.file.buffer).toString("base64");
        // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        // const cldRes = await handleUpload(dataURI);

        // if (!cldRes.secure_url) {
        //     console.error("project controller validation error of saveNewProject:", error.message)
        //     return res.status(httpCodes.BAD_REQUEST).json({ continueWork: false, message: "שגיא" });
        // }

        // console.log(cldRes.secure_url)

        console.log(title, content, draft, summerry, postImg)
        const newPost = new Post({ title, content, draft, tldr: summerry, img: postImg })
        await newPost.save()
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`blog cont error addNewPost`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.getOnePost = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await Post.findById(id)
        return res.status(httpCodes.OK).json({ continueWork: true, post })
    } catch (error) {
        console.log(`blog cont error addNewPost`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.editPost = async (req, res) => {
    try {
        const { title, content, draft, summerry, id, postImg } = req.body;
        console.log(`12312`)
        await Post.findByIdAndUpdate(id, { title, content, draft, tldr: summerry, img: postImg })
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`projects cont error editProductTexts`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.body;
        await Post.findByIdAndDelete(id)
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`projects cont error editProductTexts`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.saveImagePost = async (req, res) => {
    try {
        const { oldUrl } = req.query

        if (!oldUrl) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI);
            if (!cldRes.secure_url) {
                console.error("project controller validation error of saveNewProject:", error.message)
                return res.status(httpCodes.BAD_REQUEST).json({ continueWork: false, message: "שגיא" });
            }
            return res.status(httpCodes.OK).json({ continueWork: true, url: cldRes.secure_url })
        }

        const publicId = getPublicId(oldUrl)
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const { secure_url } = await imageUpdater(publicId, dataURI)

        return res.status(httpCodes.OK).json({ continueWork: true, url: secure_url })
    } catch (error) {
        console.log(`blog cont error saveImagePost`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.deletePostImage = async (req, res) => {
    try {
        const { id, postImg } = req.body
        const publicId = getPublicId(postImg)
        await cloudinary.uploader.destroy(`weby/${publicId}`);
        await Post.findByIdAndUpdate(id, { img: '' })
        return res.status(httpCodes.OK).json({ continueWork: true, url: "" })
    } catch (error) {
        console.log(`blog cont error saveImagePost`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}