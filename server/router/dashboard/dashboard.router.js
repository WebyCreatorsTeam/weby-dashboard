const router = require("express").Router();
const { getAllUsersDetails, arhiveUser, favoriteUser, deleteUser } = require("../../controllers/dashboard/dashboard.controller")

router
.get("/get-all-data-users", getAllUsersDetails)
.patch("/archive-user", arhiveUser)
.patch("/favorite-user", favoriteUser)
.delete("/delete-user", deleteUser)

module.exports = router;
