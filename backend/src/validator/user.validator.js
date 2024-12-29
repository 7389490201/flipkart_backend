const { check, validationResult } = require("express-validator")

exports.isSignUprequestValidate = [
    check("firstName")
    .notEmpty()
    .withMessage('FIrstName is require'),
    check("lastName")
    .notEmpty()
    .withMessage("LastName is require"),
    check("email")
    .isEmail()
    .notEmpty()
    .withMessage("Valid Email is require"),
    check("password")
    .isLength({min:6})
    .withMessage("password must be at least 6 character long ")
]

exports.isSigninrequestValidate = [
    check("email")
    .isEmail()
    .withMessage("Valid Email is require"),
    check("password")
    .isLength({min:6})
    .withMessage("password must be at least 6 character long ")
]

exports.validateRequest = (req,res,next)=>{
   
    let error=validationResult(req);
 
    if(error.array().length > 0){
        return res.status(400).json({err:error.array()[0].msg})
    }
    next()
}