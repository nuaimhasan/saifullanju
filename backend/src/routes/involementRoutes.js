const router = require("express").Router();
const {
  getAll,
  add,
  update,
  destroy,
  getSingle,
} = require("../controllers/involementController");

router.get("/all", getAll);
router.post("/add", add);
router.get("/:id", getSingle);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
