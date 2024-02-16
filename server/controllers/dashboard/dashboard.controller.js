const { mongoose } = require('mongoose');

exports.getAllUsersDetails = async (req, res) => {
    try {
        const connection = mongoose.connection;

        const collection = connection.db.collection("users");
        const userCollection = await collection.find({}).toArray(function (err, data) {
            if (err) throw err

            res.send(data); //collection data
        });

        return res.send(userCollection)
    } catch (error) {
        console.log(`dashboard cont error getAllUsersDetails`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};