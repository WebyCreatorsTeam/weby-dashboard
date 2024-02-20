const router = require("express").Router();
const { registerAdmin, loginAdmin, adminLogout } = require("../../controllers/users/users.controller");

router
    .post("/reg-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .get("/logout-admin", adminLogout)

module.exports = router;
