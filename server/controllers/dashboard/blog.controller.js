const { Post } = require("../../model/blog.model");
const { httpCodes } = require("../../utils/httpCodes/index");

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
        const { title, content, draft, summerry } = req.body;
        const newPost = new Post({ title, content, draft, tldr: summerry })
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