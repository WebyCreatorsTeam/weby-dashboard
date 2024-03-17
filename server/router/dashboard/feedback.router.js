const { saveNewFeedback, updateFeedback } = require("../../controllers/dashboard/feedback.controller");

const router = require("express").Router();

router
    .post('/save-new-feedback', saveNewFeedback)
    .patch('/update-feedback', updateFeedback)

module.exports = router;