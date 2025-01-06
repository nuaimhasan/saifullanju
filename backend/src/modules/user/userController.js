const bcrypt = require("bcrypt");
const User = require("./userModal");
const { createJsonWebToken } = require("../../utils/jsonWebToken");
const { verifyEmailSend } = require("../../utils/emailSend");
const jwt = require("jsonwebtoken");
const frontendURL = process.env.FRONTEND_URL;

exports.processRegister = async (req, res) => {
  try {
    const data = req.body;
    const isExists = await User.exists({ email: data?.email });

    if (isExists) {
      return res.json({
        success: false,
        message: "User already exist. please login",
      });
    }

    const email = data?.email;
    const name = data?.name;
    const token = createJsonWebToken(data, "10m");

    verifyEmailSend(email, token, name);

    res.send({
      success: true,
      message:
        "Verification email sent to your email. Please check your inbox.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  const { token } = req.params;

  try {
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.json({
        success: false,
        message: "unable to verify user",
      });
    }

    let { email } = decoded;

    const isExists = await User.exists({ email });
    if (isExists) {
      return res.json({
        success: false,
        message: "User already exist. please login",
      });
    }

    const result = await User.create(decoded);

    if (result) {
      res.redirect(`${frontendURL}/login`);
    }
  } catch (error) {
    res.json({
      success: false,
      message: "unable to register! please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 2. Load User
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // 5. generate token
    const accessToken = createJsonWebToken({ email, password }, "7d");

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLoggedUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User get success",
        data: user,
      });
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.updateUserInfo = async (req, res) => {
  const data = req.body;
  const { email } = req.user;

  try {
    const isExists = await User.findOne({ email });
    if (!isExists) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const id = isExists?._id;

    const result = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (result) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: "unable to update user",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};
