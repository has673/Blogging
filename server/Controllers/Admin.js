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
async function getauser(req,res,next){
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})

    }
}
async function deleteauser(req,res,next){
    try{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'user deleted', user:user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})
    }
}
module.exports = {
    getAllusers,
    getauser,
    deleteauser
 }