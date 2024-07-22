const router = require("express").Router();
const {
    addNewPost,
    getBlog,
    getOnePost,
    editPost,
    deletePost,
    changeImagePost
} = require("../../controllers/dashboard/blog.controller");
const { upload } = require("../../utils/cloudinary/storage");

router
    .post("/add-new-post", upload.single("my_file"), addNewPost)
    .get("/get-blog", getBlog)
    .post("/get-one-post", getOnePost)
    .patch('/update-post', editPost)
    .patch('/change-image-post', upload.single("my_file"), changeImagePost)
    .delete('/delete-post', deletePost)

module.exports = router;