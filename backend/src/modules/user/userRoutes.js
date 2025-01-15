const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  processRegister,
  registerUser,
  login,
  getLoggedUser,
  updateUserInfo,
  updatePassword,
} = require("./userController");

router.post("/processRegister", processRegister);
router.get("/verify/:token", registerUser);
router.post("/login", login);
router.get("/loggedUser", verifyToken, getLoggedUser);
router.patch("/update/info", verifyToken, updateUserInfo);
router.patch("/update/password", verifyToken, updatePassword);

module.exports = router;
