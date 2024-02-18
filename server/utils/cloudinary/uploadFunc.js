const cloudinary = require("cloudinary").v2;


exports.handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        folder: 'weby'
    });
    return res;
}