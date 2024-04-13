const adminRole = require("../../middleware/admin.role");
const router = require("express").Router();

router
    .use('/users', require('./dashboard.router'))
    .use('/projects', require('./project.router'))
    .use('/feedbacks', require('./feedback.router'))
    .use("/blog", require('./blog.router'))

module.exports = router;
