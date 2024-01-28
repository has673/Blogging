const express = require('express')
const Blog = require('../Controllers/Blog')
const {verifyToken , verifyAdmin} = require('../Utils/Verify')
const formidable = require('express-formidable')
const router = express.Router()


router.post("/createBlog/:id" , verifyToken ,formidable(), Blog.CreateBlog)
router.get('/getblogs' , verifyToken , Blog.getBlogs)
router.get('/getblogbyid/:id' , verifyToken , Blog.getBlogbyid)




module.exports = router