const express = require('express')
const Blog = require('../Controllers/Blog')
const {verifyToken , verifyAdmin} = require('../Utils/Verify')
const formidable = require('express-formidable')
const router = express.Router()


router.post("/createBlog/:id" , verifyToken ,formidable(), Blog.CreateBlog)
router.get('/getblogs' , /*verifyToken*/ Blog.getBlogs)
 router.get('/getblogbyid/:id' ,/* verifyToken */ Blog.getBlogbyid)
router.get('/getblogphoto/:id', Blog.getphoto)
router.put('/updateblog/:id', verifyToken, verifyAdmin, Blog.updateblog)
router.get('/searchblog', Blog.searchblog)

router.get('/getcommentsonblog/:id',Blog.commentsonblog)




module.exports = router