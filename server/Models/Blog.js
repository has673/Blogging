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
    likes:{
        type:Number,
        default:0,

    },
    dislikes:{
        type:Number,
        default:0,

    },
    photo: {
        data: Buffer,
        contentType: String,
      },

    Comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment',
            required:'true'

        }
    ],
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Blog', BlogSchema)