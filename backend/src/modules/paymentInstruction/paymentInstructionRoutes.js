const router = require("express").Router();
const { getPaymentInstruction, addPaymentInstruction, updatePaymentInstruction } = require("./paymentInstructionController");

router.get("/", getPaymentInstruction);
router.post("/add", addPaymentInstruction);
router.patch("/update/:id", updatePaymentInstruction);

module.exports = router;
