const router = require("express").Router();
const { registerAdmin, loginAdmin, adminLogout, getAllAdmins } = require("../../controllers/users/users.controller");
const adminRole = require("../../middleware/admin.role")

router
    .post("/reg-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .get("/logout-admin", adminLogout)
    .get("/get-all-admins", adminRole, getAllAdmins)

module.exports = router;
