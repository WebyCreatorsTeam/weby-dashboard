const router = require("express").Router();
const { getAllUsersDetails, arhiveUser } = require("../../controllers/dashboard/dashboard.controller")

router
.get("/get-all-data-users", getAllUsersDetails)
// .post("/archive-user", arhiveUser)

module.exports = router;
