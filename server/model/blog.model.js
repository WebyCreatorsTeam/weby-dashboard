const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    tldr: {
        type: String,
        require
    },
    title: {
        type: String,
        require
    },
    content: {
        type: String,
        require
    },
    draft: {
        type: Boolean,
        require
    },
    coverImg: {
        type: String,
        require
    }, 
    smallImg: {
        type: String,
        require
    }, 

}, { timestamps: true })

exports.Post = model("Post", PostSchema)