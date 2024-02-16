const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const { adminRegValidation, adminLogValidation } = require("../../utils/validation/adminValidation/authValidation");
const { Admin } = require("../../model/admin.model");
const { httpCodes } = require("../../utils/httpCodes");

// ---- Register Admin ---- //
exports.registerAdmin = async (req, res) => {
    try {
        const { userName, email, password, repeatPassword } = req.body

        const { error } = adminRegValidation.validate({ userName, email, password, repeatPassword });

        if (error) {
            console.error("users.controller validation error of registerAdmin:", error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ userName, email, password: hashpass, role: "admin" })
        await newAdmin.save()

        return res.status(httpCodes.OK).send({ continue: true, message: "משתמש חדש נרשם" })
    } catch (error) {
        console.log(error)
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
}


// ---- Login Admin ---- //
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email, password)

        const { error } = adminLogValidation.validate({ email, password });

        // console.log(error)
        if (error) {
            console.error("users.controller validation error of registerAdmin:", error.message);
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const existAdmin = await Admin.findOne({ email })

        console.log(existAdmin)

        if (!existAdmin) {
            console.log("users.controller user not exist");
            return res.status(httpCodes.NOT_FOUND).send({ continueWork: false, message: "משתמש לא קיים" })
        }

        const comparePass = await bcrypt.compare(password, existAdmin.password);

        if (!comparePass) {
            console.log(`users.controller Password not correc`);
            return res.status(httpCodes.UNAUTHORIZED).send({ continueWork: false, message: "הסיסמא לא נכונה" })
        }

        const cookiesData = { userID: existAdmin._id, userRole: existAdmin.role, };
        const token = jwt.encode(cookiesData, process.env.SECRET);
        res.cookie("admin", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true, })

        return res.status(httpCodes.OK).send({
            continueWork: true,
        })
    } catch (error) {
        console.error("UserCont.js line:83 function loginUser", error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "שגיא בסרבר, נא לנסות שנית" })
    }
};

exports.adminLogout = async (req, res) => {
    try {
        res.clearCookie('admin');
        console.log(`out`);
        return res.status(httpCodes.OK).send({ continueWork: false, isLogin: false });
    } catch (error) {
        console.log(`auth.js userLogout server error`);
        console.error(error); return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" });
    }
}