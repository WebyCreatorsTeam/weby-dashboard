const { mongoose } = require('mongoose');
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB);
const db = client.db("weby")
const usersCollection = db.collection("users")

const { httpCodes } = require("../../utils/httpCodes/index")

exports.getAllUsersDetails = async (req, res) => {
    try {
        const connection = mongoose.connection;

        // const collection = connection.
        // const usersCollection = db.collection("users")
        const userCollection = await usersCollection.find({})
        .toArray(function (err, data) {
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
        const { userId } = req.body
        // console.log(userId)
        // const connection = mongoose.connection;

        // const collection = db.collection("users")
        // await connection.db.collection("user").updateOne({ _id: userId }, { $set: { archive: true } }).then((aa)=> console.log(aa))
        const user = await usersCollection.findById(userId).toArray(function (err, data){
            // console.log(asdasd)
            if (err) throw err

            // console.log(data)
            return data
        })
        console.log(user)


        // const collection = connection.db.collection("users")
        // await collection.updateOne({ _id: userId }, { $set: { archive: true } })
        // .toArray(function    (err, doc) //find if a value exists
        // {
        //     if (doc && doc.length) //if it does
        //     {
        //         console.log(doc); // print out what it sends back
        //         resolve("Found user");
        //     }
        //     else // if it does not 
        //     {
        //         console.log("Not in docs");
        //         reject("Not found continue logic!")
        //     }
        // })

        // console.log(aaa)

        // const collection = await connection.db.collection("users").updateOne({_id: userID, archive: true}).

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

