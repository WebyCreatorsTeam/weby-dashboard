require('dotenv').config()
const PORT = process.env.PORT || 9090;
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
const morgan = require('morgan')
const { dbconnect } = require("./dbconnect");
const adminUser = require('./middleware/admin.user')
const adminLogin = require('./middleware/admin.login')
const { NotFoundHandler, GlobalErrorHandler } = require('./utils/error-handler.mw');

app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://www.weby-dashboard.site" : "http://localhost:3000", 
    methods: ["POST", "GET", "DELETE", "PATCH"]
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

// 404 handler
app.use(NotFoundHandler)

// Global Error Handler
app.use(GlobalErrorHandler)

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});