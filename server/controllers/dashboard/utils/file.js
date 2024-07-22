const cloudinary = require("cloudinary").v2;
const sharp = require('sharp');

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

exports.imageToURI = async (img, height, width) => {
    const image = await sharp(img.buffer).resize({ height: height, width: width }).toBuffer()
    const b64 = Buffer.from(image).toString("base64")
    const bdataURI = "data:" + img.mimetype + ";base64," + b64;
    return bdataURI;
}

// exports.deleteImage = async (image) => {
//     const publicId = getPublicId(image)
//     await cloudinary.uploader.destroy(`weby/${publicId}`);
// }

// exports.updateImage = async (oldUrl, newUrl) => {
//     const publicId = getPublicId(oldUrl)
//     const data = await imageUpdater(publicId, newUrl)
//     return data
// }
