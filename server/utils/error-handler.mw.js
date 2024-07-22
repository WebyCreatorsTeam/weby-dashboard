const { httpCodes } = require('../utils/httpCodes')

// 404 handler
exports.NotFoundHandler =  (req, res, next) => {
    const error = new Error("route not founded")
    error['status'] = httpCodes.NOT_FOUND
    next(error)
}

//Global Error
exports.GlobalErrorHandler = (error, req, res, next) => {
    console.log(error.message || "שגיא בסרבר, נא לנסות שנית")
    res.status(error.status || 500).json( {continueWork: false, message: error.message || "שגיא בסרבר, נא לנסות שנית"} )
}