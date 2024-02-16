const mongoose = require("mongoose")

const uri = process.env.MONGO_DB

exports.dbconnect = () => {
    try {
        mongoose.connect(uri).then(()=>{
            console.log(`db connected`)
        })
    } catch (error) {
        console.log(error)
    }
}