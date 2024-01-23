const express = require('express')
const Auth = require('../Controllers/Auth')

const router = express.Router()

router.post("/Signup", Auth.registerUser)

module.exports = router;