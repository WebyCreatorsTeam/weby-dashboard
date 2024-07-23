const { Post } = require("../../model/blog.model");
const { handleUpload } = require("../../utils/cloudinary/uploadFunc");
const { httpCodes } = require("../../utils/httpCodes/index");
const { updateImage, deleteImage } = require("./utils/editImage");
const { imageToURI } = require("./utils/file");

exports.getBlog = async (req, res, next) => {
    try {
        const blogs = await Post.find({})
        const blog = blogs.map(bl => ({ ...bl._doc, content: bl.content.replace(/(<([^>]+)>)/gi, "").slice(0, 80) }))
        return res.status(httpCodes.OK).json({ continueWork: true, blog })
    } catch (error) {
        next()
    }
}

exports.addNewPost = async (req, res, next) => {
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
        next()
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const { title } = req.body;
        const regex = new RegExp(title.replaceAll("-", " "), 'i')
        const post = await Post.findOne({ title: { $regex: regex } })
        return res.status(httpCodes.OK).json({ continueWork: true, post })
    } catch (error) {
        next()
    }
};

exports.editPost = async (req, res, next) => {
    try {
        const { title, content, draft, summerry, id } = req.body;
        await Post.findByIdAndUpdate(id, { title, content, draft, tldr: summerry })
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        next()
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.body;
        const post = await Post.findById(id)

        await deleteImage(post.coverImg)
        await deleteImage(post.smallImg)

        await Post.findByIdAndDelete(id)
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        next()
    }
}

exports.changeImagePost = async (req, res, next) => {
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
        next()
    }
}