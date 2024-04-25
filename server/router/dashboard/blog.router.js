const router = require("express").Router();
const { addNewPost, getBlog, getOnePost, editPost, deletePost, saveImagePost, deletePostImage } = require("../../controllers/dashboard/blog.controller");
const { upload } = require("../../utils/cloudinary/storage");

router
    .post("/add-new-post", addNewPost)
    .get("/get-blog", getBlog)
    .post("/get-one-post", getOnePost)
    .patch('/update-post', editPost)
    .delete('/delete-post', deletePost)
    .post('/add-image-post', upload.single("my_file"), saveImagePost)
    .patch('/delete-image-post', deletePostImage)



module.exports = router;