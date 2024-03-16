const express = require('express')
const Comment = require('../Controllers/Comment')
const {verifyToken}= require('../Utils/Verify')

const router = express.Router()

router.post('/makeComment/:id',verifyToken, Comment.addcoment)

// router.post('/makecomment/:id', verifytoken , commentcontroller.addcoment)

module.exports = router
