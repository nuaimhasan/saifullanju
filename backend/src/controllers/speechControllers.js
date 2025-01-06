const Model = require("../models/speechModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const isExist = await Model.findOne({});
    if (isExist) {
      return res.json({
        success: false,
        message: "Speech already exist",
      });
    }

    const result = await Model.create(data);

    res.status(201).json({
      success: true,
      message: "Speech created success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Model.findOne({});

    res.status(200).json({
      success: true,
      message: "Speech get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await Model.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Speech not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "Speech not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
