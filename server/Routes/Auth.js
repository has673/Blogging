const express = require('express')
const Auth = require('../Controllers/Auth')
const { verifyToken } = require('../Utils/Verify')

const router = express.Router()

router.post("/Signup", Auth.registerUser)
router.post("/Login", Auth.Login)
router.put("/forgotPassword", Auth.forgotPasword)
router.get('/checksignin', verifyToken , (req,res)=>{
    return res.status(200).send({ok:true})
})
module.exports = router;