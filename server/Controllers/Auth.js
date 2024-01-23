const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 async function registerUser(req,res,next){
    const{email , password } = req.body
   try{
    const user = await User.findOne({email:email})
    if(user){
        console.log("Email already in use")
        return res.status(200).json({message:"User already Exists."})
    }
    const newpass = bcrypt.hashSync(password,10)
    const newuser = new User({...req.body , password:newpass})
    await newuser.save()
    console.log('New User Added')
    return res.status(200).json({ message: "User added", user: newuser });

   }
   catch{
    return res.status(500).json({message : "Internal server error"})

   }
 }
 module.exports = {
    registerUser
 }