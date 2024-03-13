const adminRole = require("../../middleware/admin.role");
const router = require("express").Router();

router
    .use('/users', require('./dashboard.router'))
    .use('/projects', require('./project.router'))
    .use('/feedbacks', require('./feedback.router'))
// .use('/admin-page', adminRole, require(""))

module.exports = router;
