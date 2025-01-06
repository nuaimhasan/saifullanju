const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {
  get,
  add,
  update,
  getSingle,
  destroy,
} = require("../controllers/serviceController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/services";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/all", get);
router.post("/add", upload.single("icon"), add);
router.get("/:id", getSingle);
router.patch("/update/:id", upload.single("icon"), update);
router.delete("/delete/:id", destroy);

module.exports = router;
