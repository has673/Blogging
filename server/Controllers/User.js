const User = require('../Models/User');
const Blog = require('../Models/Blog');
const Comment = require('../Models/Comment');
async function getuserbyid(req, res, next) {
    try {
        console.log('user')
        const id = req.params.id
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}
async function updateuser(req,res,next){
    try{
        const {name,phone} = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // Assuming id is passed as a parameter in the URL
            { $set: { name, phone } }, // Update only the provided fields
            { new: true } // Return the updated document
          );
      
          // Check if the user was found and updated
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Return the updated user information
          console.log('user update')
          res.status(200).json(updatedUser);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}
async function myblogs(req,res,next){
    try {
        // Assuming user information is attached to the request object during authentication
        const userId = req.user._id;
    
        // Fetch blogs for the authenticated user
        const blogs = await Blog.find({ user: userId });
        console.log('my blogs')
        res.status(200).json(blogs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
const like = async(req,res,next)=>{
    try{

        const id = req.params.id
        const blog = await  Blog.findByIdAndUpdate(
              id,
            {$inc:{likes : 1  }},
            {new: true}
        )
        if(!blog){
          return   res.status(404).json({error : 'no blog found'})
        } 
        console.log('like  added')
        return  res.status(200).json( blog.title)
       

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

    }

}
async function uploadphoto(req,res,next){
    try{
        const userId = req.user._id;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
const deletemyblog = async(req,res,next)=>{
    try{
        const userid = req.user._id
        const blogid = req.params.id
        const blog = await Blog.findOne({user: userid , _id:blogid})
       if(!blog){
          return res.status(404).json({message:"no blog found"})

       }
       await blog.remove()
       console.log('blog')
       return res.status(200).json({message:"blog deeleted"})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal sever error"})
    }
}

const updateemyblog = async(req,res,next)=>{
    try{
        const userid = req.user._id
        const blogid = req.params.id
        const {tag , title , content} = req.body
        
        const blog = await Blog.findOne({user: userid , _id:blogid})
       if(!blog){
          return res.status(404).json({message:"no blog found"})

       }
       await blog.updateOne({$set:{tag , title , content}},
        {new : true}
       

       )
       console.log('blog')
       return res.status(200).json({message:"blog updated"})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal sever error"})
    }
}
const deletemycomment = async(req,res,next)=>{
    try{
        const userid = req.user._id
        const commentid = req.params.id
        const comment = await Comment.findOne({user: userid , _id:commentid})
       if(!comment){
          return res.status(404).json({message:"no blog comment"})

       }
       await comment.remove()
       console.log('comment')
       return res.status(200).json({message:"comment deeleted"})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal sever error"})
    }
}

const updateemycomment = async(req,res,next)=>{
    try{
        const userid = req.user._id
        const commentid = req.params.id
        const Content = req.body.Content
        
        const comment = await Comment.findOne({user: userid , _id:commentid})
       if(!comment){
          return res.status(404).json({message:"no comment found"})

       }
       await comment.updateOne({$set:{ Content}},
        {new : true}
       

       )
       console.log('blog')
       return res.status(200).json({message:"comment updated"})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"internal sever error"})
    }
}


module.exports = {
    
    getuserbyid,
    updateuser,
    myblogs,
    like,
    deletemyblog,
    updateemyblog,
    deletemycomment,
    updateemycomment
};