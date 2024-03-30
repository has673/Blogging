const Blog = require('../Models/Blog')
const User = require('../Models/User')
const fs = require('fs')
async function CreateBlog(req, res, next) {
    try {
        const userId = req.user._id;
        const { photo } = req.files;
        const { title, content , tags  } = req.fields
        const newblog = new Blog({ ...req.fields, user: userId })
        if (photo) {
            newblog.photo.data = fs.readFileSync(photo.path);
            newblog.photo.contentType = photo.type;
        }
        await newblog.save()
        console.log("Blog Creted <3")
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { blogs: { title, content , tags } }, // Assuming 'blogs' is an array in the User model
            },
            { new: true } // To get the updated document after the update
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User and blogs updated successfully')
        res.status(200).json({ message: 'User and blogs updated successfully', user: updatedUser });

        // res.status(200).json({message:'Blog Created'})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error" })
    }

}
async function getBlogs(req, res, next) {
    try {
        const blogs = await Blog.find()
        console.log("Blogs shown")
        return res.status(200).json(blogs)

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}
async function getBlogbyid(req, res, next) {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId)
        console.log("Blogs  by id")
        return res.status(200).json(blog)

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}
const updateblog = async(req,res,next)=>{
    try{
        const {title, content , tags} = req.body
        console.log('blod update')
        const blogId = req.params.id
        const updatedblog = await  Blog.findByIdAndUpdate(
            blogId,
            { $set : {title , content , tags} },
                {new:true}
            
        )
        if (!updatedblog) {
            console.log('blog not found')
            return res.status(404).json({ message: 'blog not found' });
          }
      
          // Return the updated user information
          console.log('blog update')
          res.status(200).json(updatedblog);

    }
   catch(err){
    console.log(err)
    return res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        err,
    });
   }
}
async function getphoto(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id).select("photo");
        console.log('photo')
        
        if (blog.photo.data) {  // Check if blog.photo exists
            console.log('get');
            res.set("Content-type", blog.photo.contentType); // Fix variable name
            console.log('get2')
            return res.status(200).send(blog.photo.data);
        } 
        else {
            console.log('No photo found for the blog');
            // Handle the case where there is no photo for the blog
            return res.status(404).send({
                success: false,
                message: "No photo found for the blog",
            });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            err,
        });
    }
}
const searchblog= async (req,res,next)=>{
    const {tag} = req.query
    try{
        if(!tag){
            return res.status.json({success : false , message : 'tag parameter required'})
        }

        const blogs = await Blog.find({tags:{$in : tag}})
        if (blogs.length === 0) {
            return res.status(404).json({ success: false, message: 'No blogs found with the specified tag.' });
          }
      
          res.status(200).json({ success: true, blogs });

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            err,
        });

    }
}
const commentsonblog = async(req,res,next)=>{
    try{
        const blogid = req.params.id
        const blog = await Blog.findById(blogid).populate('Comments')
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
          }
      
          // Return the comments associated with the blog post
          res.status(200).json({ comments: blog.Comments });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}



module.exports = {
    CreateBlog
    , getBlogs,
    getBlogbyid,
    getphoto,
    searchblog,
    updateblog,
    commentsonblog

}