const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const { adminRegValidation, adminLogValidation } = require("../../utils/validation/adminValidation/authValidation");
const { Admin } = require("../../model/admin.model");
const {Login} = require("../../model/login.model")
const { httpCodes } = require("../../utils/httpCodes");

// ---- Register Admin ---- //
exports.registerAdmin = async (req, res) => {
    try {
        const { userRegData: { userName, email, password, repeatPassword } } = req.body

        const { error } = adminRegValidation.validate({ userName, email, password, repeatPassword });

        if (error) {
            console.error("users.controller validation error of registerAdmin:", error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ userName, email, password: hashpass})
        await newAdmin.save()

        return res.status(httpCodes.OK).send({ continueWork: true, message: "משתמש חדש נרשם" })
    } catch (error) {
        console.log(`user/admin cont error registerAdmin`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

// ---- Login Admin ---- //
exports.loginAdmin = async (req, res) => {
    try {
        const { userLoginData: { email, password } } = req.body;

        const { error } = adminLogValidation.validate({ email, password });

        if (error) {
            console.error("users.controller validation error of registerAdmin:", error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const existAdmin = await Admin.findOne({ email })

        if (!existAdmin) {
            console.log("users.controller user not exist");
            return res.status(httpCodes.NOT_FOUND).send({ continueWork: false, message: "משתמש לא קיים" })
        }

        const comparePass = await bcrypt.compare(password, existAdmin.password);

        if (!comparePass) {
            console.log(`users.controller Password not correc`);
            return res.status(httpCodes.UNAUTHORIZED).send({ continueWork: false, message: "הסיסמא לא נכונה" })
        }

        /* add cheking of env (dev or production) */
        if(process.env.NODE_ENV === 'production') {
            const newLogin = new Login({ userName: existAdmin.userName, userId: existAdmin._id })
            await newLogin.save()
            await existAdmin.addEnterence(newLogin)
        }
        /* */

        const cookiesData = { userID: existAdmin._id };
        const token = jwt.encode(cookiesData, process.env.SECRET);
        // res.cookie("admin", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true, })

        return res.status(httpCodes.OK).send({ continueWork: true, token })
    } catch (error) {
        console.log(`user/admin cont error loginAdmin`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.adminLogout = async (req, res) => {
    try {
        res.clearCookie('admin');
        return res.status(httpCodes.OK).send({ continueWork: true });
    } catch (error) {
        console.log(`user/admin cont error adminLogout`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}

exports.getAllAdmins = async (req, res) => {
    try {
        const AllAdmins = await Admin.find({})
        return res.status(httpCodes.OK).send({ continueWork: true, AllAdmins })
    } catch (error) {
        console.log(`user/admin cont error getAllAdmins`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}