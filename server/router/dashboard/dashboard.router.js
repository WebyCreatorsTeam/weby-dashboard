const router = require("express").Router();
const { getAllUsersDetails } = require("../../controllers/dashboard/dashboard.controller")

router.get("/get-all-data-users", getAllUsersDetails);

module.exports = router;
