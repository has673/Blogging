const express = require('express')
const Admin = require('../Controllers/Admin')
const {verifyToken , verifyAdmin} = require('../Utils/Verify')
const router = express.Router()

router.get("/Showusers",verifyToken, verifyAdmin, Admin.getAllusers)
router.get('/Showauser',verifyToken, verifyAdmin , Admin.getauser)
router.delete('/deleteauser', verifyToken, verifyAdmin , Admin.deleteauser)

module.exports = router