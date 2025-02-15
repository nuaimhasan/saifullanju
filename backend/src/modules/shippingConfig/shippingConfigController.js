const Model = require("./shippingConfigModel");

exports.addShippingConfig = async (req, res) => {
  try {
    const data = req?.body;

    const isExist = await Model.findOne({});
    if (isExist) {
      return res.json({
        success: false,
        message: "ShippingConfig already exist",
      });
    }

    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "ShippingConfig created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getShippingConfig = async (req, res) => {
  try {
    const result = await Model.findOne({});

    res.status(200).json({
      success: true,
      message: "get success ShippingConfigs",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateShippingConfig = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "ShippingConfig not found",
      });
    }

    await Model.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
