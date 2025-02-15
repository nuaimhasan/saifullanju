const { getShippingConfig, addShippingConfig, updateShippingConfig } = require("./shippingConfigController");

const router = require("express").Router();


router.get("/", getShippingConfig);
router.post("/add", addShippingConfig);
router.patch("/update/:id", updateShippingConfig);

module.exports = router;
