const mongoose = require('mongoose');
const User = require('./User');
const BlogSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type:String,
        
    },
    User:{
        type:mongoose.ObjectdId,
        ref:"User",
        required:true,
    }
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Blog', BlogSchema)