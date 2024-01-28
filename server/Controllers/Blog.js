const Blog = require('../Models/Blog')
const User = require('../Models/User')
const fs = require('fs')
async function CreateBlog(req,res,next){
    try{
        const userId = req.params.id;
        const { photo } = req.files;
        const{title , content } = req.fields
        const newblog =  new Blog({...req.fields , user:userId})
        if (photo) {
            newblog.photo.data = fs.readFileSync(photo.path);
            newblog.photo.contentType = photo.type;
          }
        await newblog.save()
        console.log("Blog Creted <3")
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { blogs: { title, content } }, // Assuming 'blogs' is an array in the User model
            },
            { new: true } // To get the updated document after the update
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log( 'User and blogs updated successfully')
        res.status(200).json({ message: 'User and blogs updated successfully', user: updatedUser });
       
        // res.status(200).json({message:'Blog Created'})

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }

}
async function getBlogs(req,res,next){
    try{
        const blogs = await Blog.find()
        console.log("Blogs shown")
        return res.status(200).json(blogs)

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}
async function getBlogbyid(req,res,next){
    try{
        const blogId = req.params.id;
        const blog = await  Blog.findById(blogId)
        console.log("Blogs  by id")
        return res.status(200).json(blog)

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}



module.exports = {CreateBlog 
,getBlogs,
getBlogbyid,

}