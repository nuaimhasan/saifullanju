const Model = require("../models/pmModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "programs-methodology created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Model.find({});

    if (!result) {
      return res.json({
        success: false,
        message: "programs-methodology not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "programs-methodology found",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Model.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "programs-methodology not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "programs-methodology found successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isServiceExists = await Model.findById(id);

    if (!isServiceExists) {
      return res.json({
        success: false,
        message: "programs-methodology not found",
      });
    }

    const result = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "programs-methodology updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "programs-methodology not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "programs-methodology deleted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
