const jwt = require("jsonwebtoken");

exports.requireSignIn = (req,res,next)=>{
    if(req.headers.authorization){
        const user = jwt.verify(req.headers.authorization.split(" ")[1],process.env.SECRET_KEY);
        req.user = user;
        console.log(req.user);
    }else{
        return res.status(400).json({message:"Login Require"})
    }
    next();
}

exports.adminMiddleware = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(400).json({message:"Access Denied"})
    }
    next();
}
exports.userMiddleware = (req,res,next)=>{
    console.log(req.user.role);
    if(req.user.role !== "user"){
        return res.status(400).json({message:"Access Denied"})
    }
    next();
}