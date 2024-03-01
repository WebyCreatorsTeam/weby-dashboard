const jwt = require('jwt-simple');
const { httpCodes } = require('../utils/httpCodes');
const { Admin } = require('../model/admin.model');

module.exports = async (req, res, next) => {
    try {
        const { admin } = req.cookies
console.log(admin)
        if (!admin) return next()

        const { userID } = await jwt.decode(admin, process.env.SECRET)
        const existAdmin = await Admin.findOne({ _id: userID })

        req.user = existAdmin

        return next()
    } catch (error) {
        console.log(`admin.login.js error userLoginMiddlware`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}