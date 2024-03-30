const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const verifyToken = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.jwtsecret
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
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
