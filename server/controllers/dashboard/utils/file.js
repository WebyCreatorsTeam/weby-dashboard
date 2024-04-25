const cloudinary = require("cloudinary").v2;

exports.getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

exports.imageUpdater = async (imagePublicId, imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: `weby/${imagePublicId}`
        })
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}
