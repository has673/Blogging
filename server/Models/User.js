const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        
    },
    Blogs:[
    {
        type:mongoose.ObjectId,
        ref:'Blog',
        
    }
],
    
    
}
, { timestamps: true });
module.exports = mongoose.model('User', UserSchema)