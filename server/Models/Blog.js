const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type:String,
        
    },
   
},
 { timestamps: true }
);
module.exports = mongoose.model('Blog', BlogSchema)