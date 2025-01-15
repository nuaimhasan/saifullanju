const bcrypt = require("bcrypt");
const User = require("./userModal");
const { createJsonWebToken } = require("../../utils/jsonWebToken");
const { verifyEmailSend } = require("../../utils/emailSend");
const jwt = require("jsonwebtoken");
const { calculatePagination } = require("../../utils/calculatePagination");
const { pick } = require("../../utils/pick");
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

exports.updatePassword = async (req, res) => {
  const data = req?.body;
  const { email } = req.user;

  try {
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      data?.currentPassword,
      isExist?.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password does not match",
      });
    }
    const id = isExist?._id;
    const hash = await bcrypt.hash(data?.newPassword, 10);

    const result = await User.findByIdAndUpdate(
      id,
      { password: hash },
      { new: true }
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password update success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const users = await User.find({ role: "user" }).limit(limit).skip(skip);

    const total = await User.countDocuments({ role: "user" });
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    if (users) {
      res.status(200).json({
        success: true,
        message: "Users get success",
        meta: {
          total,
          pages,
          page,
          limit,
        },
        data: users,
      });
    } else {
      res.json({
        success: false,
        message: "Users not found",
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

exports.getAllAdmins = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const users = await User.find({ role: "admin" }).limit(limit).skip(skip);

    const total = await User.countDocuments({ role: "admin" });
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    if (users) {
      res.status(200).json({
        success: true,
        message: "Users get success",
        meta: {
          total,
          pages,
          page,
          limit,
        },
        data: users,
      });
    } else {
      res.json({
        success: false,
        message: "Users not found",
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
