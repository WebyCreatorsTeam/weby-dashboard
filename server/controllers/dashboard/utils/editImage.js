const cloudinary = require("cloudinary").v2;
const { getPublicId, imageUpdater } = require("./file");

exports.deleteImage = async (image) => {
    const publicId = getPublicId(image)
    await cloudinary.uploader.destroy(`weby/${publicId}`);
}

exports.updateImage = async (oldUrl, newUrl) => {
    const publicId = getPublicId(oldUrl)
    const data = await imageUpdater(publicId, newUrl)
    return data
}