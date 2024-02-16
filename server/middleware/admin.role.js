const { httpCodes } = require("../utils/httpCodes");

module.exports = (req, res, next) => {
    try {
        if (!req.user) {                                                  //if the user is not loggin, return false
            return res.status(httpCodes.NOT_FOUND).send({ continueWork: false, message: "נא להיכנס למשתמש" });
        }

        const { role } = req.user

        if (role !== "admin") {                                       //if the user is not role = admin (his role = user), return false
            return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "שגיא" });
        }

        return next() //if the user logged and role admin continue
    } catch (error) {
        console.log(`user.role.js error userRoleMiddlware`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}