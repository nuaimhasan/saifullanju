const router = require("express").Router();
const singleUploder = require("../../utils/singleUploder");
const {
  add,
  getAll,
  getById,
  getBySlug,
  update,
  softDelete,
} = require("./trainingController");

const upload = singleUploder(
  `${process.cwd()}/uploads/training`,
  1024 * 1024 * 2, // 2MB
  "image"
);

router.post("/add", upload, add);
router.get("/all", getAll);
router.get("/:id", getById);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", upload, update);
router.delete("/soft-delete/:id", softDelete);

module.exports = router;
