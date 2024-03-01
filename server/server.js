require('dotenv').config()
const express = require("express");
const { dbconnect } = require("./dbconnect");
const app = express();
const PORT = process.env.PORT || 9090;
const cookieParser = require('cookie-parser');
const adminLogin = require('./middleware/admin.login')
const path = require('node:path');
const cloudinary = require("cloudinary").v2;
const cors = require('cors')

app.use(express.json());
app.use(cookieParser());

// const whitelist = ["https://weby-dashboard-client.vercel.app/"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     optionsSuccessStatus: 200
// }

app.use(cors(
    {
        origin: "https://weby-dashboard-client.vercel.app", 
        methods: ["POST", "GET", "DELETE", "PATCH"],
        // credentials: true
    }
))
// cors(corsOptions)
dbconnect()
app.use(adminLogin)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

app.get("/", (req, res) => {
    try {
        return res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.json({ "error": error })
    }
})

app.use('/auth', require("./router/admin/admin.route"))
app.use('/dashboard', require("./router/dashboard/index.router"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});