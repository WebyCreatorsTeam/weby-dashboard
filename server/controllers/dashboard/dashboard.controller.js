const { mongoose } = require('mongoose');
const {httpCodes} = require("../../utils/httpCodes/index")

exports.getAllUsersDetails = async (req, res) => {
    try {
        const connection = mongoose.connection;

        const collection = connection.db.collection("users");
        const userCollection = await collection.find({}).toArray(function (err, data) {
            if (err) throw err

            // res.send(data); //collection data
            return data
        });

        return res.send(userCollection)
    } catch (error) {
        console.log(`dashboard cont error getAllUsersDetails`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.arhiveUser = async (req, res) => {
    try {
        const { userID } = req.body
        const connection = mongoose.connection;

        const collection = connection.db.collection("users");
        const aaa = await collection.update({_id: userID}, {$set:{ archive: true }})

        console.log(aaa)

        // const collection = await connection.db.collection("users").updateOne({_id: userID, archive: true});

        // const userCollection = await collection.find({}).toArray(function (err, data) {
        //     if (err) throw err

        //     // res.send(data); //collection data
        //     return data
        // });

        // const user = userCollection.find(us=> us._id == userID)

        // console.log(user)

        // user.archive = true

        // await user.save()

        // res.send(user)
        //    const user = await collection.find({"_id": userID})
        //    .toArray(function (err, data) {
        //         if (err) throw err

        //         res.send(data); //collection data
        //         console.log(data)
        //         return data
        //     });

        // console.log(user)

        //65cf87bc578f9c67f1fce106

    } catch (error) {
        console.log(`dashboard cont error arhiveUser`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })

    }
}