const User = require('../Models/User')

async function getAllusers(req,res,next){
    try{
        const users = await User.find()  
        res.status(200).json(users)
    }
    catch{
        return res.status(500).json({message : "Internal server error"})

    }

}
module.exports = {
    getAllusers
 }