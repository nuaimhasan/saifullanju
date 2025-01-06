const router = require("express").Router();
const singleUploder = require("../../utils/singleUploder");
const {
  add,
  getAll,
  getById,
  getBySlug,
  update,
  destroy,
  updateStatus,
} = require("./bookController");

const upload = singleUploder(
  `${process.cwd()}/uploads/book`,
  1024 * 1024 * 2, // 2MB
  "image"
);

router.post("/add", upload, add);
router.get("/all", getAll);
router.get("/:id", getById);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", upload, update);
router.patch("/update/status/:id", updateStatus);
router.delete("/delete/:id", destroy);

module.exports = router;
