const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAll,
  add,
  getSingle,
  update,
  destroy,
  getBySlug,
} = require("../../controllers/blog/blogController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/all", getAll);
router.post("/add", upload, add);
router.get("/:id", getSingle);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", upload, update);
router.delete("/delete/:id", destroy);

module.exports = router;
