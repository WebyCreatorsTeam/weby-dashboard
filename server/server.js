const express = require("express");
require('dotenv').config()
const { dbconnect } = require("./dbconnect");
const app = express();
const PORT = process.env.PORT || 9090;
const cookieParser = require('cookie-parser');

const adminLogin = require('./middleware/admin.login')
const adminRole = require('./middleware/admin.role')

app.use(express.json());
app.use(cookieParser());
app.use(express.static('../client/build'))
app.use(adminLogin)

dbconnect()

app.use('/auth', require("./router/admin/admin.route"))
app.use('/dashboard', adminRole, require("./router/dashboard/dashboard.router"))

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});