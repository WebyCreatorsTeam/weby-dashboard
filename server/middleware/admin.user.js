const jwt = require('jwt-simple');
const { Admin } = require('../model/admin.model');

module.exports = async (req, res, next) => {
    try {
        const {token} = req.query

        if (token == "null" || token == undefined) return next()

        const { userID } = await jwt.decode(token, process.env.SECRET)
        const existAdmin = await Admin.findOne({ _id: userID })

        req.user = existAdmin

        return next()
    } catch (error) {
        next()
    }
}