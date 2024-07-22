const { Post } = require("../../model/blog.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index");
const { updateImage, deleteImage } = require("./utils/editImage");
const { imageToURI } = require("./utils/file");
// const { imageToURI, deleteImage, updateImage } = require("./utils/file");
// const sharp = require('sharp');

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
        const image = req.file;
        const data = req.body;

        const bdataURI = await imageToURI(image, 540, 960)
        const sdataURI = await imageToURI(image, 180, 320)

        const bCldRes = await handleUpload(bdataURI);
        const sCldRes = await handleUpload(sdataURI);

        if (!bCldRes.secure_url) {
            console.log(`none bCldRes.secure_url`)
            return res.status(httpCodes.BAD_REQUEST).json({ continueWork: false, message: "שגיא" })
        }

        if (!sCldRes.secure_url) {
            console.log(`none bCldRes.secure_url`)
            return res.status(httpCodes.BAD_REQUEST).json({ continueWork: false, message: "שגיא" })
        }

        const newPost = new Post({ ...data, coverImg: bCldRes.secure_url, smallImg: sCldRes.secure_url })
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
        const { title, content, draft, summerry, id } = req.body;
        await Post.findByIdAndUpdate(id, { title, content, draft, tldr: summerry })
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
        const post = await Post.findById(id)

        await deleteImage(post.coverImg)
        await deleteImage(post.smallImg)

        await Post.findByIdAndDelete(id)
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        console.log(`projects cont error editProductTexts`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.changeImagePost = async (req, res) => {
    try {
        const { postId } = req.query
        const image = req.file

        const bdataURI = await imageToURI(image, 540, 960)
        const sdataURI = await imageToURI(image, 180, 320)

        const post = await Post.findById(postId)

        const bImg = await updateImage(post.coverImg, bdataURI)
        const sImg = await updateImage(post.smallImg, sdataURI)

        await Post.findByIdAndUpdate(postId, { coverImg: bImg.secure_url, smallImg: sImg.secure_url })
        return res.status(httpCodes.OK).json({ continueWork: true, url: bImg.secure_url })
    } catch (error) {
        console.log(`projects cont error editProductTexts`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).json({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}