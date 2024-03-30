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
    photo: {
        data: Buffer,
        contentType: String,
     },
    Blogs:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        
    },
   
   
]
,
likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
    },
]

,
Comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        
    },
    
   
]

    
    
}
, { timestamps: true });
module.exports = mongoose.model('User', UserSchema)