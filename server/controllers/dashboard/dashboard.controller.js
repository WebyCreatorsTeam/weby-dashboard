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
        console.error(error);
        return res.send({
            continueWork: false,
            message: "שגיאה בשרת, נסה שנית",
        });
    }
};