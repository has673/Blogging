const express = require('express');
const usercontroller = require('../Controllers/User');
const { verifyToken } = require('../Utils/Verify');

const router = express.Router();

// Example: Define a route that requires authentication
router.get("/getuserbyid/:id", verifyToken,  usercontroller.getuserbyid);
router.put('/updateuser/:id', verifyToken, usercontroller.updateuser)
router.get('/myblogs', verifyToken, usercontroller.myblogs)
router.put('/likeblog/:id', verifyToken,usercontroller.like)
router.delete('/deletemyblog/:id', verifyToken , usercontroller.deletemyblog)
router.put('/updatemyblog/:id', verifyToken,usercontroller.updateemyblog)
router.delete('/deletemycomment/:id' , verifyToken , usercontroller.deletemycomment)
router.put('/updateemycomment/:id' , verifyToken , usercontroller.updateemycomment)
module.exports = router;
