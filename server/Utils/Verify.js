const jwt=require('jsonwebtoken')
const User = require('../Models/User')
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    // console.log(token)
    if(!token){
        return res.status(401).json("You are not authenticated!")
    }
    jwt.verify(token,process.env.jwtsecret,async (err,data)=>{
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        
        req.userId=data._id
       
        // console.log("passed")
        
        next()
    })
}
const verifyAdmin= async (req,res,next)=>{
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== "Admin") {
          return res.status(401).send({
            success: false,
            message: "UnAuthorized Access",
          });
        } else {
          next();
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({
          success: false,
          error,
          message: "Error in admin middelware",
        });
      }
    
}

module.exports= {
    verifyToken,
    verifyAdmin
}