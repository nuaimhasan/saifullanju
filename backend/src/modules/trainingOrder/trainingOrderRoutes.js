const router = require("express").Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("./trainingOrderController");

router.post("/add", createOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/update-status/:id", updateOrderStatus);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
