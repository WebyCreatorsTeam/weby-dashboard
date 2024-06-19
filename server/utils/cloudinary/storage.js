const Multer = require("multer");

const storage = new Multer.memoryStorage();

exports.upload = Multer({
    storage,
});
