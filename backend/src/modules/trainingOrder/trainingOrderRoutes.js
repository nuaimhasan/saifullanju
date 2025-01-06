const router = require("express").Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("./trainingOrderController");

router.post("/add", createOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);

module.exports = router;
