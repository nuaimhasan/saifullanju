const jwt = require("jsonwebtoken");
const User = require("../modules/user/userModal");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};
