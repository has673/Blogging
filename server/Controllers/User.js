const User = require('../Models/User');
const Blog = require('../Models/Blog');
async function getuserbyid(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
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

module.exports = {
    
    getuserbyid,
    updateuser,
    myblogs
};