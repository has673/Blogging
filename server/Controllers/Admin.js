const User = require('../Models/User')
const Blog = require('../Models/Blog')
async function getAllusers(req,res,next){
    try{
        const users = await User.find()  
        res.status(200).json(users)
    }
    catch{
        return res.status(500).json({message : "Internal server error"})

    }

}
async function getauser(req,res,next){
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})

    }
}
async function deleteauser(req,res,next){
    try{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'user deleted', user:user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal server error"})
    }
}
async function deleteBlogbyid(req,res,next){
    try{
        const blogId = req.params.id;
        const blog = await  Blog.findByIdAndDelete(blogId)
        console.log("Blogs  deleted")
        return res.status(200).json(blog)

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
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
module.exports = {
    getAllusers,
    getauser,
    deleteauser,
    deleteBlogbyid,
    getBlogbyid,
    getBlogs
 }