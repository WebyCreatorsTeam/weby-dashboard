require('dotenv').config()
const express = require("express");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const { dbconnect } = require("./dbconnect");
const app = express();
const PORT = process.env.PORT || 9090;
const cookieParser = require('cookie-parser');
const adminLogin = require('./middleware/admin.login')
const adminRole = require('./middleware/admin.role')
const path = require('node:path'); 

app.use(express.json());
app.use(cookieParser());
app.use(express.static('../client/build'))
app.use(adminLogin)

dbconnect()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        //public_id:`/weby/${file}"`
        folder: 'weby'
    });
    return res;
}


const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});


app.post("/upload", upload.single("my_file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        console.log(cldRes.secure_url)
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});

// app.get("/image-get", async () => {
//     const {data} = await axios.get()
// })


// app.use('/cloud', (req, res) => {
//     try {
//         // const file = req.files
//         console.log(`www`)
//         console.log(req.files)
//         // cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//         //     { public_id: "pppp" },
//         //     function (error, result) { console.log(result); });
//     } catch (error) {
//         console.log(error)
//     }
// })

// const uploadCloud = async (file) => {
//             //const res = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//         //     { public_id: "pppp" },
//         //     function (error, result) { console.log(result); });
//         // return res
// }


app.use('/auth', require("./router/admin/admin.route"))
app.use('/dashboard', adminRole, require("./router/dashboard/dashboard.router"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});