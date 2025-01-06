const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const { get, update, add } = require("../controllers/aboutControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/", get);
router.post("/add", upload, add);
router.patch("/update/:id", upload, update);

module.exports = router;
