const { saveNewFeedback } = require("../../controllers/dashboard/feedback.controller");

const router = require("express").Router();

router
    .post('/save-new-feedback', saveNewFeedback)

module.exports = router;