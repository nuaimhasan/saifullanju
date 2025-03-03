const express = require("express");
const router = express.Router();
const multer = require("multer");
const { add, getAll, getSingle, destroy } = require("./galleryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/gallery");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/add", upload, add);
router.get("/all", getAll);
router.get("/:id", getSingle);
router.delete("/delete/:id", destroy);

module.exports = router;
