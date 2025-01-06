const router = require("express").Router();
const { get, add, update } = require("../controllers/speechControllers");

router.get("/", get);
router.post("/add", add);
router.patch("/update/:id", update);

module.exports = router;
