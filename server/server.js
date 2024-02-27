require('dotenv').config()
const express = require("express");
const { dbconnect } = require("./dbconnect");
const app = express();
const PORT = process.env.PORT || 9090;
const cookieParser = require('cookie-parser');
const adminLogin = require('./middleware/admin.login')
// const adminRole = require('./middleware/admin.role')
const path = require('node:path');
const cloudinary = require("cloudinary").v2;

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

app.use('/auth', require("./router/admin/admin.route"))
app.use('/dashboard', require("./router/dashboard/index.router"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});