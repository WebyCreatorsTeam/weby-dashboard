const { httpCodes } = require("../../utils/httpCodes/index");
const { User } = require('../../model/user.model');

exports.getAllUsersDetails = async (req, res) => {
    try {
        const usersCalls = await User.find({})

        return res.status(httpCodes.OK).send({ continueWork: true, usersCalls })
    } catch (error) {
        console.log(`dashboard cont error getAllUsersDetails`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.arhiveUser = async (req, res) => {
    try {
        const { userId } = req.body

        await User.findByIdAndUpdate(userId, { $set: { archive: true, favorite: false } })
        return res.status(httpCodes.OK).send({ continueWork: true })
    } catch (error) {
        console.log(`dashboard cont error arhiveUser`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.favoriteUser = async (req, res) => {
    try {
        const { userId } = req.body

        await User.findByIdAndUpdate(userId, { $set: { archive: false, favorite: true } })
        return res.status(httpCodes.OK).send({ continueWork: true })
    } catch (error) {
        console.log(`dashboard cont error arhiveUser`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        await User.findByIdAndDelete(userId)
        return res.status(httpCodes.OK).send({ continueWork: true })
    } catch (error) {
        console.log(`dashboard cont error arhiveUser`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

