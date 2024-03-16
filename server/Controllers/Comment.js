const Comment = require('../Models/Comment')
const Blog= require('../Models/Blog')
const User = require('../Models/User')

 const addcoment=async(req,res,next)=>{
    try{
        const userid  = req.user._id
        const blog    = req.params.id
        const Content = req.body.Content
        const comment = new Comment({Content , User:userid ,Blog:blog})
        await comment.save()
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            {
                $push: { Comments:comment._id }, // Assuming 'blogs' is an array in the User model
            },
            { new: true } // To get the updated document after the update
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            blog,
            {
                $push: { Comments:comment._id }, // Assuming 'blogs' is an array in the User model
            },
            { new: true } // To get the updated document after the update
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        console.log('comment created')
        return res.status(200).json({message:"comment created"})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'internal server error'})
    }
 }

module.exports = {
    addcoment
}