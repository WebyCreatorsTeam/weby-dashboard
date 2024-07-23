const cloudinary = require("cloudinary").v2;
const { getPublicId, imageUpdater } = require("./file");

exports.deleteImage = async (image) => {
    try {
        const publicId = getPublicId(image)
        await cloudinary.uploader.destroy(`weby/${publicId}`);
    } catch (error) {
        console.log(error)
        return error
    }
}

exports.updateImage = async (oldUrl, newUrl) => {
    try {
        const publicId = getPublicId(oldUrl)
        const data = await imageUpdater(publicId, newUrl)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}