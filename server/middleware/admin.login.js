const { httpCodes } = require("../utils/httpCodes");

module.exports = (req, res, next) => {
    try {
        if(!req.user) {
            console.log(`message: "נא להיכנס למשתמש"`)
            return res.status(httpCodes.NOT_FOUND).send({ continueWork: false, message: "נא להיכנס למשתמש" });   //if the user is not loggin, return false
        }

        return next() //if the user logged continue
    } catch (error) {
        next()
    }
}