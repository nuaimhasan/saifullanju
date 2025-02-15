const mongoose = require("mongoose");

const shippingConfigSchema = new mongoose.Schema({
  charge: {
    type: Number,
    required: true,
  },

});

const ShippingConfig = mongoose.model("ShippingConfig", shippingConfigSchema);

module.exports = ShippingConfig;
