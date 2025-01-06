const express = require("express");
const router = express.Router();
const {
  getAll,
  add,
  update,
  destroy,
  getSingle,
  getBySlug,
} = require("../../controllers/blog/categoryController");

router.get("/all", getAll);
router.post("/add", add);
router.get("/:id", getSingle);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
