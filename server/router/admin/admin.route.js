const router = require("express").Router();
const { registerAdmin, loginAdmin } = require("../../controllers/users/users.controller");

router
    .post("/save-admin", registerAdmin)
    .post("/login-admin", loginAdmin)


module.exports = router;
