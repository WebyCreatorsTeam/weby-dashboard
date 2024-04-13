const router = require("express").Router();
const { addNewPost, getBlog, getOnePost } = require("../../controllers/dashboard/blog.controller");

router
    .post("/add-new-post", addNewPost)
    .get("/get-blog", getBlog)
    .post("/get-one-post", getOnePost)


module.exports = router;