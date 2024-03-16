const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    Content:{
        type: String,
        required:"true",
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    
    },
    Blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:"true"
    },
  
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Comment', CommentSchema)