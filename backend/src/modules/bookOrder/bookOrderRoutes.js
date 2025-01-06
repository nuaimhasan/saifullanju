const router = require("express").Router();
const {
  addOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
} = require("./bookOrderController");

router.post("/add", addOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/update/status/:id", updateStatus);

module.exports = router;
