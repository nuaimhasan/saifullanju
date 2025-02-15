const Model = require("./paymentInstructionModel");

exports.addPaymentInstruction = async (req, res) => {
  try {
    const data = req?.body;

    const isExist = await Model.findOne({});
    if (isExist) {
      return res.json({
        success: false,
        message: "PaymentInstruction already exist",
      });
    }

    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "PaymentInstruction created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPaymentInstruction = async (req, res) => {
  try {
    const result = await Model.findOne({});

    res.status(200).json({
      success: true,
      message: "get success PaymentInstructions",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePaymentInstruction = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "PaymentInstruction not found",
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
