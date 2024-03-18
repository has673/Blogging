const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('no token')
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.jwtsecret, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    // Set user information in req.user
    req.user = { _id: data._id, /* Add other user properties if needed */ };

    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "Admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
