const { saveNewFeedback, updateFeedback, deleteFeedback, showAllFeedbacks } = require("../../controllers/dashboard/feedback.controller");

const router = require("express").Router();

router
    .post('/save-new-feedback', saveNewFeedback)
    .patch('/update-feedback', updateFeedback)
    .patch('/delete-feedback', deleteFeedback)
    .get('/get-all-feedbacks', showAllFeedbacks)

module.exports = router;