const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI

exports.dbconnect = () => {
    try {
        mongoose.connect(uri).then(()=>{
            console.log(`db connected`)
        })
    } catch (error) {
        console.log(error)
    }
}