const mongoose = require('mongoose');
const User = require('./User');
const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    content:{
        type:String,
        required:true,
        
    },
    tags: {
        type: [String], // Change this to an array of strings
      },
  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    photo: {
        data: Buffer,
        contentType: String,
      },
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Blog', BlogSchema)