const { httpCodes } = require("../../utils/httpCodes/index");
const { User } = require('../../model/user.model');

/* Get all customers details*/
exports.getAllUsersDetails = async (req, res, next) => {
    try {
        const usersCalls = await User.find({})
        return res.status(httpCodes.OK).json({ continueWork: true, usersCalls })
    } catch (error) {
        next()
    }
};

/* Archive customer */
exports.arhiveUser = async (req, res, next) => {
    try {
        const { userId, archive, favorite } = req.body
        await User.findByIdAndUpdate(userId, { $set: { archive, favorite } })
        return res.status(httpCodes.OK).json({ continueWork: true, archiveUser: archive, favoriteUser: favorite })
    } catch (error) {
        next()
    }
}

/* Save as favorite customer */
exports.favoriteUser = async (req, res, next) => {
    try {
        const { userId, favorite, archive } = req.body
        await User.findByIdAndUpdate(userId, { $set: { archive, favorite } })
        return res.status(httpCodes.OK).json({ continueWork: true, favoriteUser: favorite, archiveUser: archive })
    } catch (error) {
        next()
    }
}

/* Delete customer */
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.body
        await User.findByIdAndDelete(userId)
        return res.status(httpCodes.OK).json({ continueWork: true })
    } catch (error) {
        next()
    }
}

