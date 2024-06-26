require('dotenv').config()
const express = require("express");
const { dbconnect } = require("./dbconnect");
const app = express();
const PORT = process.env.PORT || 9090;
const cookieParser = require('cookie-parser');
const adminUser = require('./middleware/admin.user')
const adminLogin = require('./middleware/admin.login')
const cloudinary = require("cloudinary").v2;
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://weby-dashboard-client.vercel.app" : "http://localhost:3000", //process.env. 
    methods: ["POST", "GET", "DELETE", "PATCH"],
}))

dbconnect()
app.use(adminUser)

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
app.use('/dashboard', adminLogin, require("./router/dashboard/index.router"))

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});