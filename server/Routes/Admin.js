const express = require('express')
const Admin = require('../Controllers/Admin')
const {verifyToken , verifyAdmin} = require('../Utils/Verify')
const router = express.Router()

router.get("/Showusers",/*verifyToken, verifyAdmin,*/ Admin.getAllusers)
router.get('/Showauser/:id',verifyToken, verifyAdmin , Admin.getauser)
router.delete('/deleteauser/:id', /*verifyToken, verifyAdmin */ Admin.deleteauser)
router.get('/getblogs' , verifyToken , Admin.getBlogs)
router.get('/getblogbyid/:id' , verifyToken , Admin.getBlogbyid)
router.delete('/deleteablog/:id', /*verifyToken, verifyAdmin ,*/ Admin.deleteBlogbyid)
router.get('/getblogbyuser/:id' , verifyToken , Admin.getblogbyuser)
router.get("/admin-auth",verifyToken , verifyAdmin, (req,res)=>{
    return   res.status(200).send({ok:true})
 } )



module.exports = router