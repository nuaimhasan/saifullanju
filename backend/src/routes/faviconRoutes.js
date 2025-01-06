const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFavicon,
  updateFavicon,
  getFavicons,
} = require("../controllers/faviconController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/favicon");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", getFavicons);
router.post("/add", upload.single("icon"), addFavicon);
router.patch("/update/:id", upload.single("icon"), updateFavicon);

module.exports = router;
