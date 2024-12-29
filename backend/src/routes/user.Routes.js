const express  = require("express");
const { signUp, signIn, adminSignup } = require("../controllers/user.Controller");
const { requireSignIn, userMiddleware } = require("../middleware");
const { isSignUprequestValidate, validateRequest, isSigninrequestValidate } = require("../validator/user.validator");
const router = express.Router()


router.post("/signup",isSignUprequestValidate,validateRequest, signUp)
router.post("/signin",isSigninrequestValidate,validateRequest, signIn)
router.post("/admin/signup",adminSignup)

router.post("/profile",requireSignIn,userMiddleware,(req,res)=>{
    res.status(200).json({message:"profile"})
})


module.exports = router;