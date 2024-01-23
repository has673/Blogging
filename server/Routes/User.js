const express = require('express');
const usercontroller = require('../Controllers/User');
const { verifyToken } = require('../Utils/Verify');

const router = express.Router();

// Example: Define a route that requires authentication
router.get("/getuserbyid/:id", verifyToken, usercontroller.getuserbyid);

module.exports = router;
