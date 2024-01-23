const express = require('express')
const Auth = require('../Controllers/Auth')

const router = express.Router()

router.post("/Signup", Auth.registerUser)
router.post("/Login", Auth.Login)
router.put("/forgotPassword", Auth.forgotPasword)
module.exports = router;