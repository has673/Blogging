const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    Content:{
        type: String
    },
  
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Comment', CommentSchema)