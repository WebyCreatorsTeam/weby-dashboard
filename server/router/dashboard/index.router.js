const router = require("express").Router();

router
    .use('/users', require('./dashboard.router'))
    .use('/projects', require('./project.router'))

module.exports = router;
