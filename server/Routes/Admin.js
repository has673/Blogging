const express = require('express')
const Admin = require('../Controllers/Admin')

const router = express.Router()

router.get("/Showusers", Admin.getAllusers)

module.exports = router